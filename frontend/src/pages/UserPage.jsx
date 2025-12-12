import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../App.css'; // ใช้ CSS เดิม

// Import Components ที่เราแยกไว้
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';
import Pagination from '../components/Pagination';

function UserPage() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        first_name: '', last_name: '', email: '', phone: '', role: 'user'
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const API_BASE = "http://localhost:8001/api/users";

    useEffect(() => { fetchUsers(1); }, []);

    const fetchUsers = (page = 1) => {
        fetch(`${API_BASE}/?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setTotalPages(data.total_pages);
                setCurrentPage(data.current_page);
            })
            .catch(err => console.error(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const onlyNumbersAndComma = value.replace(/[^0-9,]/g, '');
            setFormData({ ...formData, [name]: onlyNumbersAndComma });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => { setSelectedFile(e.target.files[0]); };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('first_name', formData.first_name);
        data.append('last_name', formData.last_name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('role', formData.role);
        if (selectedFile) data.append('image', selectedFile);

        const url = editingId ? `${API_BASE}/${editingId}/update/` : `${API_BASE}/add/`;

        fetch(url, { method: 'POST', body: data }).then((res) => {
            if (res.ok) {
                Swal.fire({ title: 'สำเร็จ!', icon: 'success', timer: 1500, confirmButtonColor: '#4a90e2' });
                resetForm();
                fetchUsers(currentPage);
            } else {
                Swal.fire('Error', 'บันทึกไม่สำเร็จ', 'error');
            }
        });
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({ first_name: '', last_name: '', email: '', job_title: '', phone: '', role: 'user' });
        setSelectedFile(null);
        if (document.getElementById('fileInput')) document.getElementById('fileInput').value = "";
        setIsFormOpen(false);
    };

    const handleEditClick = (user) => {
        setIsFormOpen(true);
        setEditingId(user.id);
        setFormData({ ...user, role: user.role || 'user' }); // Shorthand copy
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'ลบไหม?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#e74c3c'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_BASE}/${id}/delete/`, { method: 'DELETE' }).then(() => fetchUsers(currentPage));
            }
        });
    };

    const handlePageChange = (p) => {
        fetchUsers(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredUsers = users.filter((u) => {
        const term = searchTerm.toLowerCase();
        return (
            u.first_name.toLowerCase().includes(term) ||
            u.job_title?.toLowerCase().includes(term) ||
            u.phone?.includes(term) ||
            u.role?.toLowerCase().includes(term)
        );
    });

    return (
        <div className="app-container">
            <h1 className="app-title">CRUD System</h1>

            {/* เรียกใช้ Component ฟอร์ม */}
            <UserForm
                formData={formData} handleChange={handleChange} handleFileChange={handleFileChange}
                handleSubmit={handleSubmit} isFormOpen={isFormOpen} toggleForm={() => isFormOpen ? resetForm() : setIsFormOpen(true)}
                editingId={editingId}
            />

            <div className="search-container">
                <input className="search-input" placeholder="🔍 ค้นหา..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="user-grid">
                {filteredUsers.length > 0 ? (
                    // เรียกใช้ Component การ์ด (วนลูปสร้างการ์ด)
                    filteredUsers.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onEdit={handleEditClick}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <div style={{ textAlign: 'center', width: '100%', color: '#888' }}>🚫 ไม่พบข้อมูล</div>
                )}
            </div>

            {/* เรียกใช้ Component ปุ่มเปลี่ยนหน้า */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}

export default UserPage;