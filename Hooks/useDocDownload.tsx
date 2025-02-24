import { useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

type useDocDownloadProp = {
    TEMPLATE_URL: string
    documentData: {}
    fileTitle: string
}

const useDocDownload = ({ TEMPLATE_URL = '/docs/term-result.docx', documentData = {}, fileTitle = '' }: useDocDownloadProp) => {
    const [loading, setLoading] = useState(false);

    const fetchTemplate = async () => {
        const response = await fetch(TEMPLATE_URL);
        if (!response.ok) throw new Error('Failed to fetch template');
        return response.arrayBuffer();
    };

    const generateDocument = async () => {
        const templateData = await fetchTemplate();
        const docZip = new PizZip(templateData);
        const doc = new Docxtemplater(docZip);

        // Set the template variables
        doc.setData(documentData);

        try {
            doc.render();
        } catch (error) {
            console.error('Error rendering template:', error);
            throw error;
        }

        const docContent = doc.getZip().generate({ type: 'blob' });
        saveAs(docContent, `${fileTitle}.docx`);
    };

    const downloadDocx = async () => {
        setLoading(true);
        try {
            await generateDocument();
        } catch (error) {
            console.error('Error generating DOCX:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        downloadDocx,
    };
};

export default useDocDownload;
