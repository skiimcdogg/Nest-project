import { useState, useEffect } from "react";
import apiHandler from "../services/apiHandler";
import ExtensionType from "../type";

const useExtensions = () => {
    const [extensions, setExtensions] = useState<ExtensionType[]>([]);

    useEffect(() => {
        const loadExtensions = async () => {
            try {
                const extensions = await apiHandler.getAllExtensions()
                setExtensions(extensions)
            } catch(error) {
                console.error("Error during the extensions fetching", error);
            };
        };
        loadExtensions();
      }, []);

      return { extensions }
};

export default useExtensions;