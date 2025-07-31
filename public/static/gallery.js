// Gallery management for teacher dashboard
let galleryImages = [];

async function loadGalleryImages() {
    try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        galleryImages = data.images;
        displayGalleryImages();
    } catch (error) {
        console.error('Failed to load gallery images:', error);
        // Fallback to static images if API fails
        loadStaticImages();
    }
}

function displayGalleryImages() {
    const galleryContainer = document.getElementById('galleryContainer');
    if (!galleryContainer) return;

    if (galleryImages.length === 0) {
        galleryContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> No images in gallery yet.
                    <br>Images will appear here once they are approved by an admin.
                </div>
            </div>
        `;
        return;
    }

    galleryContainer.innerHTML = galleryImages.map((img, index) => `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card h-100 gallery-card" onclick="openImageModal(${index})">
                <img src="${img.url}" class="card-img-top" alt="Generated Image" 
                     style="height: 200px; object-fit: cover;"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5NTU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg=='">
                <div class="card-body">
                    <h6 class="card-title">${img.title || 'Generated Image'}</h6>
                    <p class="card-text text-muted">${img.description || 'AI Generated'}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function loadStaticImages() {
    // Fallback function for when API fails
    galleryImages = [
        {
            url: '/static/images/placeholder1.jpg',
            title: 'Sample Image 1',
            description: 'AI Generated'
        },
        {
            url: '/static/images/placeholder2.jpg',
            title: 'Sample Image 2',
            description: 'AI Generated'
        }
    ];
    displayGalleryImages();
}

function openImageModal(index) {
    const img = galleryImages[index];
    if (!img) return;

    // Create modal for image viewing
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${img.title || 'Generated Image'}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <img src="${img.url}" class="img-fluid" alt="Generated Image">
                    <p class="mt-3">${img.description || 'AI Generated'}</p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadGalleryImages();
});