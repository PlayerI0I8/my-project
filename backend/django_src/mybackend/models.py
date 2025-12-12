from django.db import models

class UserProfile(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=50) # หรือ max_length=15 ตามที่คุณแก้ล่าสุด
    image = models.ImageField(upload_to='users/', null=True, blank=True)

    # ✅ เพิ่ม 2 ส่วนนี้เข้าไปครับ (ต่อท้าย image)
    ROLE_CHOICES = [
        ('admin', 'Admin (ผู้ดูแลระบบ)'),
        ('seller', 'Seller (คนขายของ)'),
        ('user', 'User (ลูกค้าทั่วไป)'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return self.first_name