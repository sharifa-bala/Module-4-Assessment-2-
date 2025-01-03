document.addEventListener("DOMContentLoaded", function() {
    const puzzlePieces = document.querySelectorAll('.draggable');
    const puzzleGridDrops = document.querySelectorAll('.puzzle-grid-drop');
    
    // Enable dragstart event to allow dragging of puzzle pieces
    puzzlePieces.forEach(piece => {
        piece.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
        });
    });

    // Allow puzzle grid cells to accept the dragged items
    puzzleGridDrops.forEach(gridCell => {
        gridCell.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessary to allow drop
        });

        gridCell.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedPieceId = e.dataTransfer.getData('text');
            const draggedPiece = document.getElementById(draggedPieceId);

            // Check if piece is already in the correct grid
            if (!gridCell.contains(draggedPiece)) {
                gridCell.innerHTML = ''; // Clear the grid cell if it contains an image
                gridCell.appendChild(draggedPiece);
                draggedPiece.style.position = 'absolute'; // Remove from grid flow
                draggedPiece.style.left = '0';
                draggedPiece.style.top = '0';

                // If it's in the correct position, make it static (optional)
                draggedPiece.setAttribute('draggable', false);
            }
        });
    });

    // Optional: If you want to allow pieces to return to their original positions if incorrect
    puzzlePieces.forEach(piece => {
        piece.addEventListener('dragend', () => {
            const correctCell = document.getElementById(`grid${piece.dataset.correctRow}-${piece.dataset.correctCol}`);
            if (!correctCell.contains(piece)) {
                // Place the piece back in its initial position or reset
                piece.style.position = 'initial'; // Remove custom position style
                piece.style.left = '';
                piece.style.top = '';
            }
        });
    });
});
