import React from 'react';
import ExtensionType from '../../type';

type ExtensionsFilterProps = {
    extensions: ExtensionType[];
    selectedExtension: string;
    setSelectedExtension: (extensions: string) => void;
}

function ExtensionsFilter({extensions, selectedExtension, setSelectedExtension}: ExtensionsFilterProps) {

    const handleExtensionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const extensionSelected = extensions.find(extension => extension.setName === event.target.value)
        if(extensionSelected) {
            setSelectedExtension(extensionSelected.setName)
        } else {
            setSelectedExtension('')
        }
    };

    return (
        <div>
            <select className="select-extension" value={selectedExtension} onChange={handleExtensionChange}>
                <option value="">Please select an extension</option>
                {extensions.map((extension) => (
                    <option key={extension.code} value={extension.setName}>
                        {extension.setName}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ExtensionsFilter;