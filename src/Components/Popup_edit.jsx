import React from 'react'

const Popup_edit = ({task_id ,deleteFunction}) => {
  return (
    <>
    {/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal_edit" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="col-md-10"
  >
    <div className="modal-content">
      
      
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={(e)=>deleteFunction(e,task_id)}>Delete</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Popup_edit