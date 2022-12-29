interface Scripts {
    name: string;
    src: string;
    elementId: string;
}  
export const ScriptStore: Scripts[] = [
    {
        name: 'iNaturalistWidget',
        src: 'https://www.inaturalist.org/observations/dirkvdl16.widget?layout=large&limit=10&order=desc&order_by=observed_on',
        elementId: 'inatScriptOutput'
    },
];