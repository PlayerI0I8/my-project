import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
    // ฟังก์ชันเลือกสีป้ายตาม Role
    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return '#e74c3c';  // สีแดง
            case 'seller': return '#f39c12'; // สีส้ม
            default: return '#95a5a6';       // สีเทา (User)
        }
    };

    return (
        <div className="user-card-full">
            <div className="card-header-visual">
                <img
                    src={user.image_url || 'https://via.placeholder.com/150'}
                    alt="profile"
                    className="profile-image-large"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
                />
            </div>

            <div className="card-body">
                <h3 className="user-name">{user.first_name} {user.last_name}</h3>

                {/* ✅ รวม Role และ Job Title ไว้ในป้ายเดียวกัน */}
                <div style={{ marginBottom: '15px' }}>
                    <span className="user-job" style={{
                        background: getRoleColor(user.role),
                        color: 'white',
                        padding: '6px 15px',      // เพิ่มพื้นที่ในป้ายหน่อย
                        borderRadius: '20px',     // ปรับให้มนๆ
                        display: 'inline-block',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)' // ใส่เงาให้ดูเด่น
                    }}>
                        {/* โชว์ตำแหน่งงาน (ถ้ามี) แล้วคั่นด้วย | */}
                        {user.job_title ? `${user.job_title}  |  ` : ''}

                        {/* โชว์ Role */}
                        {user.role ? user.role.toUpperCase() : 'USER'}
                    </span>
                </div>

                <div className="contact-info">
                    <p>📧 {user.email}</p>
                    <p>📞 {user.phone || '-'}</p>
                </div>
            </div>

            <div className="card-footer">
                <button onClick={() => onEdit(user)} className="action-btn edit-btn">✏️ แก้ไข</button>
                <button onClick={() => onDelete(user.id)} className="action-btn delete-btn">🗑️ ลบ</button>
            </div>
        </div>
    );
};

export default UserCard;