import React, { useState } from 'react';
import { Product, Category } from '../types';

type Props = {
  initial?: Partial<Product>;
  submitLabel?: string;
  onSubmit: (p: Omit<Product, 'id'> | Product) => void;
};

const categories: Category[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

export default function ProductForm({ initial = {}, submitLabel = 'Save', onSubmit }: Props) {
  const [ten, setTen] = useState(initial.ten ?? '');
  const [danhMuc, setDanhMuc] = useState<Category | ''>(initial.danhMuc ?? '');
  const [gia, setGia] = useState<number | ''>(initial.gia ?? '');
  const [soLuong, setSoLuong] = useState<number | ''>(initial.soLuong ?? '');
  const [moTa, setMoTa] = useState(initial.moTa ?? '');
  const [errors, setErrors] = useState<Record<string,string>>({});

  function validate() {
    const e: Record<string,string> = {};
    if (!ten || ten.trim().length < 3) e.ten = 'Tên bắt buộc, ít nhất 3 ký tự';
    if (danhMuc === '') e.danhMuc = 'Chọn danh mục';
    if (gia === '' || Number(gia) <= 0 || Number.isNaN(Number(gia))) e.gia = 'Giá phải là số dương';
    if (soLuong === '' || !Number.isInteger(Number(soLuong)) || Number(soLuong) < 0) e.soLuong = 'Số lượng là số nguyên không âm';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      ...(initial.id ? { id: initial.id } : {}),
      ten: ten.trim(),
      danhMuc: danhMuc as Category,
      gia: Number(gia),
      soLuong: Number(soLuong),
      moTa: moTa.trim(),
    } as any;
    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
      <div>
        <label>Tên</label>
        <input value={ten} onChange={(e)=>setTen(e.target.value)} />
        {errors.ten && <div style={{ color: 'red' }}>{errors.ten}</div>}
      </div>
      <div>
        <label>Danh mục</label>
        <select value={danhMuc} onChange={(e)=>setDanhMuc(e.target.value as Category)}>
          <option value=''>-- Chọn --</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.danhMuc && <div style={{ color: 'red' }}>{errors.danhMuc}</div>}
      </div>
      <div>
        <label>Giá</label>
        <input type="number" value={gia as any} onChange={(e)=>setGia(e.target.value ? Number(e.target.value) : '')} />
        {errors.gia && <div style={{ color: 'red' }}>{errors.gia}</div>}
      </div>
      <div>
        <label>Số lượng</label>
        <input type="number" value={soLuong as any} onChange={(e)=>setSoLuong(e.target.value ? Number(e.target.value) : '')} />
        {errors.soLuong && <div style={{ color: 'red' }}>{errors.soLuong}</div>}
      </div>
      <div>
        <label>Mô tả</label>
        <textarea value={moTa} onChange={(e)=>setMoTa(e.target.value)} />
      </div>
      <div>
        <button type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}
