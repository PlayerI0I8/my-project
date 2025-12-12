import React from 'react';

const UserForm = ({
    formData, handleChange, handleFileChange, handleSubmit,
    isFormOpen, toggleForm, editingId
}) => {

    return (
        <>
            <button className={`toggle-form-btn ${isFormOpen ? 'open' : ''}`} onClick={toggleForm}>
                {isFormOpen ? '❌ ปิดฟอร์ม' : '➕ เพิ่มสมาชิกใหม่'}
            </button>

            <div className={`form-wrapper ${isFormOpen ? 'show' : ''}`}>
                <div className={`form-card ${editingId ? 'edit-mode' : ''}`}>
                    <h2 className="form-title">{editingId ? '✏️ แก้ไขข้อมูลสมาชิก' : '✨ กรอกข้อมูลสมาชิก'}</h2>
                    <form onSubmit={handleSubmit} className="user-form">
                        <div className="form-group"><label>ชื่อจริง</label><input className="form-input" name="first_name" value={formData.first_name} onChange={handleChange} required /></div>
                        <div className="form-group"><label>นามสกุล</label><input className="form-input" name="last_name" value={formData.last_name} onChange={handleChange} required /></div>
                        <div className="form-group"><label>อีเมล</label><input className="form-input" name="email" value={formData.email} onChange={handleChange} required /></div>
                        <div className="form-group"><label>เบอร์โทร</label><input className="form-input" name="phone" value={formData.phone} onChange={handleChange} maxLength={21} /></div>

                        {/* เลือก Role */}
                        <div className="form-group">
                            <label>สิทธิ์การใช้งาน (Role)</label>
                            <select className="form-input" name="role" value={formData.role} onChange={handleChange} style={{ background: 'white' }}>
                                <option value="user">User (ลูกค้าทั่วไป)</option>
                                <option value="seller">Seller (คนขายของ)</option>
                                <option value="admin">Admin (ผู้ดูแลระบบ)</option>
                            </select>
                        </div>

                        <div className="form-group"><label>รูปโปรไฟล์</label><input id="fileInput" className="form-input" type="file" onChange={handleFileChange} accept="image/*" /></div>

                        <button type="submit" className="submit-btn">{editingId ? '💾 บันทึกการแก้ไข' : '✨ ยืนยันข้อมูล'}</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserForm;