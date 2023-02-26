import React from "react";

export function Join({ join, children }: { join: any; children: any[] }) {
    return children.length > 0
        ? children.reduce((result, item) => (
              <>
                  {result}
                  {join}
                  {item}
              </>
          ))
        : null;
}
