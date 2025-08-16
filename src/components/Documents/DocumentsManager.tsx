import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, FileText, ExternalLink, Upload } from 'lucide-react';
import DataTable from '../Common/DataTable';
import Modal from '../Common/Modal';
import { useAuth } from '../../context/AuthContext';
import { documentsService, Document } from '../../services/documentsService';

const DocumentsManager: React.FC = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    description: ''
  });

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const data = await documentsService.getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    try {
      setUploading(true);
      await documentsService.uploadDocument(selectedFile, formData.description);
      await loadDocuments();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to upload document:', error);
      alert('Failed to upload document. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (document: Document) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await documentsService.deleteDocument(document.id);
        await loadDocuments();
      } catch (error) {
        console.error('Failed to delete document:', error);
        alert('Failed to delete document. Please try again.');
      }
    }
  };

  const handleViewDetails = (document: Document) => {
    setSelectedDocument(document);
    setShowDetailsModal(true);
  };

  const resetForm = () => {
    setFormData({
      description: ''
    });
    setSelectedFile(null);
  };

  const columns = [
    { key: 'file_name', label: 'File Name', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'content_type', label: 'Type', sortable: true },
    { key: 'file_size', label: 'Size', sortable: true },
    { 
      key: 'created_at', 
      label: 'Uploaded', 
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: 'file_url',
      label: 'Download',
      render: (value: string, row: Document) => (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )
    }
  ];

  const actions = [
    {
      label: 'View Details',
      icon: Eye,
      onClick: handleViewDetails,
      variant: 'secondary' as const
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: handleDelete,
      variant: 'danger' as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents Management</h1>
          <p className="text-gray-600">Manage property documents and legal papers</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <DataTable
        data={documents}
        columns={columns}
        actions={actions}
        searchable={true}
        exportable={false}
        importable={false}
        title="Document Records"
      />

      {/* Upload Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title="Upload Document"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select File *
            </label>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Optional description for the document..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Document Details"
        size="lg"
      >
        {selectedDocument && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">File Name</label>
              <p className="text-sm text-gray-900">{selectedDocument.file_name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Description</label>
              <p className="text-sm text-gray-900">{selectedDocument.description || 'No description'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">File Type</label>
              <p className="text-sm text-gray-900">{selectedDocument.content_type}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">File Size</label>
              <p className="text-sm text-gray-900">{selectedDocument.file_size || 'Unknown'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Uploaded Date</label>
              <p className="text-sm text-gray-900">{new Date(selectedDocument.created_at).toLocaleString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">File URL</label>
              <a 
                href={selectedDocument.file_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                Download File <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DocumentsManager;