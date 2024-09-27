import { useState, useEffect } from "react";

function useScript(src : string) {
    // Keep track of script status ("idle", "loading", "ready", "error")
    const [status, setStatus] = useState<string | null>(src ? "loading" : "idle");

    useEffect(() => {
        if (!src) {
            setStatus("idle");
            return;
        }

        let script : HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);

        if (!script) {
            // Create script
            script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
            script.crossOrigin="anonymous";
            script.setAttribute("data-status", "loading");

            document.body.appendChild(script);

            const setAttributeFromEvent = (event: Event) => {
                if(script){
                    script.setAttribute(
                        "data-status",
                        event.type === "load" ? "ready" : "error"
                    );
                }
            };

            script.addEventListener("load", setAttributeFromEvent);
            script.addEventListener("error", setAttributeFromEvent);
        } else {
            const status: string | null = script.getAttribute("data-status");
            setStatus(status);
        }

        const setStateFromEvent = (event: Event) => {
            setStatus(event.type === "load" ? "ready" : "error");
        };

        script.addEventListener("load", setStateFromEvent);
        script.addEventListener("error", setStateFromEvent);

        return () => {
            if (script) {
                script.removeEventListener("load", setStateFromEvent);
                script.removeEventListener("error", setStateFromEvent);
            }
        };
    }, [src]);

    return status;
}

export { useScript };