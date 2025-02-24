import { useEffect, useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

const useDocDownload = ({ docType = 'term-result', TEMPLATE_URL = '/docs/term-result.docx' }) => {
    const [documentData, setDocumentData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (docType === 'term-result') {
            setDocumentData({
                first_name: 'Mudasir Bashir',
                fathers_name: 'Bashir Ahmad',
                current_class: '8th',
                academic_year: '2029-2030',
                section: 'A',
                time: new Date().toLocaleString(),  // Current time in local format
            });
        }
    }, [docType]);

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
        saveAs(docContent, `mudasir_Details.docx`);
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
