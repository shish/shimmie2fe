import React, { FormEvent, useState } from "react";
import { Autocomplete } from "../../components/Autocomplete/Autocomplete";
import { Block, FormItem, MaybeError, Submit } from "../../components/basics";
import { human_size, serverInfo } from "../../utils";

import css from "./Upload.module.scss";

type FileState = {
    data?: File;
    url?: string;
    tags: string;
    source: string;
    error?: string;
};
type UploadResults = {
    error?: string;
    results?: {
        error?: string;
        image_id?: number;
    }[];
};
export function Upload() {
    const [commonTags, setCommonTags] = useState("");
    const [commonSource, setCommonSource] = useState("");
    const [files, setFiles] = useState<FileState[]>([]);
    const [thumbs, setThumbs] = useState<{ [id: string]: string }>({});
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    ///////////////////////////////////////////////////////////////////
    // For appending new files
    function setData(f: FileList | null) {
        if (f) {
            addFiles(f);
        }
    }
    function handleDrag(e: any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }
    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer) {
            addFiles(e.dataTransfer.files);
        }
    }
    function addFiles(added_files: FileList) {
        let new_files = [...files];
        // added_files spontaneously becomes empty at some point, so let's
        // fetch all the data into our own storage ASAP, and then process
        // our own storage.
        for (let i = 0; i < added_files.length; i++) {
            let fd: FileState = {
                data: added_files[i],
                tags: "",
                source: "",
            };
            new_files.push(fd);
        }
        new_files.forEach((fd) => {
            if (fd.data && fd.data.type.startsWith("image/") && thumbs[fd.data.name] === undefined) {
                let fr = new FileReader();
                fr.onload = function () {
                    setThumbs((thumbs) => {
                        let new_thumbs = { ...thumbs };
                        if (fr.result && fd.data) {
                            new_thumbs[fd.data.name] = fr.result?.toString();
                        }
                        return new_thumbs;
                    });
                };
                fr.readAsDataURL(fd.data);
            }
        });
        setFiles(new_files);
    }

    ///////////////////////////////////////////////////////////////////
    // For editing existing files
    function cancelFile(n: number) {
        setFiles(files.slice(0, n).concat(files.slice(n + 1)));
    }
    function setUrl(n: number, u: string) {
        let new_files = [...files];
        new_files[n].url = u;
        setFiles(new_files);
    }
    function setTags(n: number, t: string) {
        let new_files = [...files];
        new_files[n].tags = t;
        setFiles(new_files);
    }
    function setSource(n: number, s: string) {
        let new_files = [...files];
        new_files[n].source = s;
        setFiles(new_files);
    }

    ///////////////////////////////////////////////////////////////////
    // Actually upload
    function upload(e: FormEvent) {
        e.preventDefault();
        setUploading(true);
        setError(null);

        const data = new FormData();
        data.append(`common_tags`, commonTags);
        data.append(`common_source`, commonSource);
        files.forEach((file, i) => {
            if (!file.data && !file.url) return;

            if (file.data) {
                data.append(`data${i}`, file.data, file.data.name);
            } else if (file.url) {
                data.append(`url${i}`, file.url);
            }
            data.append(`tags${i}`, file.tags);
            data.append(`source${i}`, file.source);
        });

        // https://httpbin.org/post
        fetch(serverInfo.root + "/graphql_upload", {
            method: "POST",
            body: data,
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem("session"),
            }),
        })
            .then((res) => res.json())
            .then((data: UploadResults) => {
                if (data.error) {
                    setError(data.error);
                }
                if (data.results) {
                    let new_files = [...files];
                    data.results.forEach((r, n) => {
                        new_files[n].error = r.error;
                    });
                    setFiles(new_files);
                }
            })
            .catch((err) => setError(JSON.stringify(err)))
            .finally(() => setUploading(false));
    }

    ///////////////////////////////////////////////////////////////////
    // Rendering
    function getLabel(n: number, fs: FileState) {
        const cancel = <span onClick={(e) => cancelFile(n)}>(X)</span>;
        if (fs.url)
            return (
                <>
                    {n + 1}: Transload {cancel}
                </>
            );
        if (fs.data)
            return (
                <>
                    {n + 1}: {fs.data.name} ({fs.data.type},{" "}
                    {human_size(fs.data.size)}) {cancel}
                </>
            );
        return <>{n + 1}: Empty</>;
    }

    return (
        <article
            onDragEnter={handleDrag}
            onDrop={handleDrop}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
        >
            {dragActive ? (
                <Block className={css.dropTarget}>
                    <div>Drop Here</div>
                </Block>
            ) : (
                <Block>
                    <form
                        onSubmit={upload}
                        className={css.uploadForm}
                        method="POST"
                    >
                        <FormItem label="Common Tags">
                            <Autocomplete
                                name="common_tags"
                                placeholder="Tags"
                                value={commonTags}
                                onValue={setCommonTags}
                            />
                        </FormItem>
                        <FormItem label="Common Source">
                            <input
                                name="common_source"
                                placeholder="Source"
                                value={commonSource}
                                onChange={(e) =>
                                    setCommonSource(e.target.value)
                                }
                            />
                        </FormItem>
                        {files.map((file, n) => (
                            <FormItem key={n} label={getLabel(n, file)}>
                                <div className={css.fileEntry}>
                                    <div>
                                        {file.url !== undefined && (
                                            <input
                                                type="url"
                                                placeholder="Enter URL"
                                                value={file.url}
                                                onChange={(e) =>
                                                    setUrl(n, e.target.value)
                                                }
                                                autoFocus={true}
                                            />
                                        )}
                                        <Autocomplete
                                            name={`tags${n}`}
                                            placeholder={"Tags"}
                                            value={file.tags}
                                            onValue={(v) => setTags(n, v)}
                                        />
                                        <input
                                            name={`source${n}`}
                                            placeholder={"Source"}
                                            value={file.source}
                                            onChange={(e) =>
                                                setSource(n, e.target.value)
                                            }
                                        />
                                        <MaybeError error={file.error} />
                                    </div>
                                    {file.data?.name &&
                                        thumbs[file.data?.name] && (
                                            <img
                                                alt="Upload"
                                                src={thumbs[file.data?.name]}
                                            />
                                        )}
                                </div>
                            </FormItem>
                        ))}
                        <FormItem label="Add">
                            <div className={css.fou}>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setData(e.target.files);
                                        e.target.value = "";
                                    }}
                                    multiple={true}
                                />
                                <i>or</i>
                                <input
                                    type="url"
                                    placeholder="Enter URL"
                                    onChange={(e) => {
                                        let new_files = [...files];
                                        new_files.push({
                                            url: e.target.value,
                                            tags: "",
                                            source: "",
                                        });
                                        setFiles(new_files);
                                        e.target.value = "";
                                    }}
                                />
                            </div>
                            <div style={{textAlign: "center", marginTop: "0.5em"}}>
                                <i>or drag & drop onto this window</i>
                            </div>
                        </FormItem>
                        <Submit
                            passive={"Upload"}
                            active={"Upload in progress..."}
                            inactive={"No files selected"}
                            query={{ loading: uploading }}
                            condition={files.length > 0}
                        />
                        {error}
                    </form>
                </Block>
            )}
        </article>
    );
}
