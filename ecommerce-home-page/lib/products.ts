export type Product = {
  id: string
  title: string
  price: number
  image: string
  category: string
  description: string
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Tai nghe Bluetooth cao cấp',
    price: 899000,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&h=900&fit=crop',
    category: 'Điện tử',
    description:
      'Tai nghe không dây chống ồn với pin 30 giờ, thiết kế gọn nhẹ và âm thanh bass sâu.',
  },
  {
    id: '2',
    title: 'Đồng hồ thông minh',
    price: 1299000,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=900&fit=crop',
    category: 'Điện tử',
    description:
      'Đồng hồ thông minh theo dõi sức khỏe, nhịp tim và thông báo cuộc gọi ngay trên cổ tay.',
  },
  {
    id: '3',
    title: 'Áo sơ mi lụa cao cấp',
    price: 499000,
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&h=900&fit=crop',
    category: 'Thời trang',
    description:
      'Áo sơ mi lụa mềm mịn, vừa vặn thanh lịch cho công sở và tiệc tối.',
  },
  {
    id: '4',
    title: 'Quần jeans denim xanh',
    price: 599000,
    image:
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=900&h=900&fit=crop',
    category: 'Thời trang',
    description:
      'Quần jeans denim co giãn, form ôm nhẹ nhàng, phù hợp nhiều phong cách hàng ngày.',
  },
  {
    id: '5',
    title: 'Gối ôm trang trí',
    price: 249000,
    image:
      'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=900&h=900&fit=crop',
    category: 'Nhà cửa',
    description:
      'Gối ôm đẹp mắt, vải mềm, dùng làm điểm nhấn nội thất cho phòng khách và phòng ngủ.',
  },
  {
    id: '6',
    title: 'Đèn LED phòng ngủ',
    price: 399000,
    image:
      'https://images.unsplash.com/photo-1571199633066-f45d11832ebc?w=900&h=900&fit=crop',
    category: 'Nhà cửa',
    description:
      'Đèn LED thiết kế hiện đại, đổi màu dễ dàng, tạo không gian ấm áp và thư giãn.',
  },
  {
    id: '7',
    title: 'Mỹ phẩm dưỡng da',
    price: 359000,
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900&h=900&fit=crop',
    category: 'Làm đẹp',
    description:
      'Bộ mỹ phẩm dưỡng ẩm sâu, phục hồi da mềm mịn và sáng tự nhiên.',
  },
  {
    id: '8',
    title: 'Nước hoa nữ cao cấp',
    price: 799000,
    image:
      'https://images.unsplash.com/photo-1594947225046-f9978d6ae298?w=900&h=900&fit=crop',
    category: 'Làm đẹp',
    description:
      'Nước hoa sang trọng với hương thơm lâu và ấn tượng cho buổi đi chơi và dạ tiệc.',
  },
  {
    id: '9',
    title: 'Giày chạy bộ',
    price: 1099000,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&h=900&fit=crop',
    category: 'Thể thao',
    description:
      'Giày chạy bộ êm chân, độ bám tốt, giúp bạn tự tin trên mọi cung đường.',
  },
  {
    id: '10',
    title: 'Balo thể thao',
    price: 499000,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&h=900&fit=crop',
    category: 'Thể thao',
    description:
      'Balo chống nước, dung tích lớn, phù hợp đi gym và du lịch ngắn ngày.',
  },
  {
    id: '11',
    title: 'Camera DSLR chuyên nghiệp',
    price: 15999000,
    image:
      'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=900&h=900&fit=crop',
    category: 'Điện tử',
    description:
      'Camera DSLR với ống kính sắc nét, đáp ứng tốt cho cả chụp ảnh và quay video.',
  },
  {
    id: '12',
    title: 'Laptop gaming',
    price: 25999000,
    image:
      'https://images.unsplash.com/photo-1588872657840-790ff3bde4c0?w=900&h=900&fit=crop',
    category: 'Điện tử',
    description:
      'Laptop gaming cấu hình cao, tối ưu cho game và tác vụ sáng tạo nội dung.',
  },
]

export function getProductById(id: string) {
  return PRODUCTS.find((product) => product.id === id) || null
}
