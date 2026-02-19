import React from 'react'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const DeleteModal = () => {
    const handleConfirm = async () => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        });
    
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        }
      };
    
      return (
        <button className="confirm-text" onClick={handleConfirm}>
          Click me
        </button>
      );
    
}

export default DeleteModal
