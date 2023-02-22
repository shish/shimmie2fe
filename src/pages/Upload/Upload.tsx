import React, { FormEvent, useState } from "react";
import { Autocomplete } from "../../components/Autocomplete/Autocomplete";
import { Block, FormItem } from "../../components/basics";
import { serverInfo } from "../../utils";

import css from "./Upload.module.scss";

type FileState = {
    data: File | null,
    url: string | null,
    tags: string,
    source: string,
    img: string | null,
}
export function Upload() {
    const [commonTags, setCommonTags] = useState("");
    const [commonSource, setCommonSource] = useState("");
    const [files, setFiles] = useState<FileState[]>([]);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    function upload(e: FormEvent) {
        e.preventDefault();
        setUploading(true);

        const data = new FormData();
        data.append(`common_tags`, commonTags)
        data.append(`common_source`, commonSource)
        files.forEach((file, i) => {
            if (!file.data && !file.url) return;

            if (file.data) {
                data.append(`data${i}`, file.data, file.data.name);
            }
            else if (file.url) {
                data.append(`url${i}`, file.url)
            }
            data.append(`tags${i}`, file.tags)
            data.append(`source${i}`, file.source)
        });

        // https://httpbin.org/post
        fetch(serverInfo.root + '/graphql_upload', {
            method: 'POST',
            body: data,
        })
            .then((res) => res.json())
            .then((data) => setResult(JSON.stringify(data)))
            .catch((err) => setError(err))
            .finally(() => setUploading(false));
    }

    ///////////////////////////////////////////////////////////////////
    // For editing existing files
    function cancelFile(n: number) {
        setFiles(
            files.slice(0, n).concat(files.slice(n+1))
        );
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
    };
    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer) {
            addFiles(e.dataTransfer.files);
        }
    }
    function addFiles(fs: FileList) {
        let new_files = [...files];
        for (let i = 0; i < fs.length; i++) {
            let fd: FileState = {
                data: fs[i],
                url: null,
                tags: "",
                source: "",
                img: null,
            };
            new_files.push(fd);
            // FIXME: need to tell react that the promise happened
            let fr = new FileReader();
            fr.onload = function () {
                if (fr.result) {
                    fd.img = fr.result?.toString();
                };
            }
            fr.readAsDataURL(fs[i]);
        }
        setFiles(new_files);
    }

    ///////////////////////////////////////////////////////////////////
    // Rendering
    function getLabel(n: number, fs: FileState) {
        const cancel = <span onClick={(e) => cancelFile(n)}>(X)</span>;
        if (fs.url) return <>{n + 1}: Transload {cancel}</>;
        if (fs.data) return <>{n + 1}: {fs.data.name} {cancel}</>;
        return <>{n + 1}: Empty</>;
    }

    return (
        <article
            onDragEnter={handleDrag}
            onDrop={handleDrop}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
        >
            {dragActive ?
                <Block className={css.dropTarget}><div>Drop Here</div></Block> :
                <Block>
                    <form onSubmit={upload} className={css.uploadForm} method="POST">
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
                                onChange={(e) => setCommonSource(e.target.value)}
                            />
                        </FormItem>
                        {files.map((file, n) =>
                            <FormItem key={n} label={getLabel(n, file)}>
                                <div className={css.fileEntry}>
                                    <div>
                                        {file.url !== null &&
                                            <input
                                                type="url"
                                                placeholder="Enter URL"
                                                value={file.url}
                                                onChange={(e) => setUrl(n, e.target.value)}
                                            />}
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
                                            onChange={(e) => setSource(n, e.target.value)}
                                        />
                                    </div>
                                    {file.img && <img alt="Upload" src={file.img} />}
                                </div>
                            </FormItem>
                        )}
                        <FormItem label="Add">
                            <div className={css.fou}>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setData(e.target.files)
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
                                            data: null,
                                            url: e.target.value,
                                            tags: "",
                                            source: "",
                                            img: null,
                                        })
                                        setFiles(new_files);
                                        e.target.value = "";
                                    }}
                                />
                            </div>
                        </FormItem>
                        <input
                            type="submit"
                            value={uploading ? "Upload in progress..." : "Upload"}
                            disabled={uploading}
                        />
                        {result}
                        {error}
                    </form>
                </Block>
            }
        </article>
    );
}
