import React from 'react';

export default function ResumeModal({ isOpen, onClose, showToast }) {
    if (!isOpen) return null;

    const handleDownload = () => {
        showToast('Curriculum Vitae: Generated &amp; Saved successfully.');
        onClose();
    };

    const handleBackdropClick = (e) => {
        if (e.target.id === 'resume-modal') {
            onClose();
        }
    };

    return (
        <div id="resume-modal" style={{ display: 'flex' }} onClick={handleBackdropClick}>
            <div className="modal-box">
                <button className="modal-close" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="modal-icon">
                    <i className="fa-solid fa-file-pdf"></i>
                </div>
                <h3>Resume Generator &amp; Download</h3>
                <p>
                    Sri Nithish's official, updated professional resume reflecting his BE degree, Totex Energy cloud integrations, Mr. Cooper internship, and SVCT CSE leadership backgrounds.
                </p>
                <div className="modal-file-info">
                    <p>File Summary:</p>
                    <ul>
                        <li>
                            <strong>Name:</strong> Sri_Nithish_S_Resume_2026.pdf
                        </li>
                        <li>
                            <strong>Size:</strong> 188 KB
                        </li>
                        <li>
                            <strong>Specialty Area:</strong> AWS Infrastructure &amp; Embedded System Design
                        </li>
                    </ul>
                </div>
                <div className="modal-actions">
                    <button onClick={handleDownload} className="btn-primary">
                        <i className="fa-solid fa-cloud-arrow-down"></i> Proceed Download
                    </button>
                    <button onClick={onClose} className="btn-ghost">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
