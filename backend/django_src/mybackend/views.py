from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserProfile
from django.conf import settings
from django.core.paginator import Paginator # ใช้สำหรับแบ่งหน้า

def get_users_from_db(request):
    # 1. ดึงข้อมูลทั้งหมด (เรียงจากใหม่ไปเก่า)
    all_users = UserProfile.objects.all().order_by('-id')
    
    # 2. แบ่งหน้า (หน้าละ 6 คน)
    items_per_page = 6
    paginator = Paginator(all_users, items_per_page)
    
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)
    
    data = []
    base_url = request.build_absolute_uri('/')[:-1]
    DEFAULT_IMG = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"

    for u in page_obj:
        img_url = DEFAULT_IMG
        if u.image and u.image.name:
            img_url = base_url + settings.MEDIA_URL + u.image.name
            
        data.append({
            "id": u.id,
            "first_name": u.first_name,
            "last_name": u.last_name,
            "email": u.email,
            "phone": u.phone,           
            "role": u.role,  # ✅ เพิ่ม: ส่งค่า role กลับไปให้ Frontend
            "image_url": img_url
        })
        
    return JsonResponse({
        "source": "MySQL", 
        "users": data,
        "total_pages": paginator.num_pages,
        "current_page": int(page_number)
    })

@csrf_exempt
def add_user(request):
    if request.method == 'POST':
        # รับข้อมูลจาก FormData
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        role = request.POST.get('role', 'user') # ✅ เพิ่ม: รับค่า role (ถ้าไม่มีให้เป็น user)
        
        # รับไฟล์รูปภาพ (ถ้ามี)
        image = request.FILES.get('image')

        # บันทึกลง Database
        user = UserProfile(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            role=role, # ✅ บันทึก role
            image=image
        )
        user.save()

        return JsonResponse({"message": "User added successfully!"})

@csrf_exempt
def update_user(request, user_id):
    if request.method == 'POST': # ใช้ POST เพื่อรองรับไฟล์
        try:
            user = UserProfile.objects.get(id=user_id)
            
            # อัปเดตข้อมูล
            user.first_name = request.POST.get('first_name', user.first_name)
            user.last_name = request.POST.get('last_name', user.last_name)
            user.email = request.POST.get('email', user.email)
            user.phone = request.POST.get('phone', user.phone)
            user.role = request.POST.get('role', user.role) # ✅ เพิ่ม: อัปเดต role
            
            # อัปเดรูปภาพใหม่ (ถ้ามี)
            if 'image' in request.FILES:
                user.image = request.FILES['image']
            
            user.save()
            return JsonResponse({"status": "success", "message": "User updated!"})
            
        except UserProfile.DoesNotExist:
            return JsonResponse({"status": "error", "message": "User not found"}, status=404)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
            
    return JsonResponse({"status": "error", "message": "Invalid method"}, status=405)

@csrf_exempt
def delete_user(request, user_id):
    if request.method == 'DELETE':
        try:
            user = UserProfile.objects.get(id=user_id)
            user.delete()
            return JsonResponse({"message": "User deleted successfully!"})
        except UserProfile.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)