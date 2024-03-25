import React from 'react'

const Popup = ({task_id ,deleteFunction}) => {
  return (
    <>
    {/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Are you sure?</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
      <p>Do you really want to delete these record? This process cannot be undone.</p>
      </div>
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

export default Popup