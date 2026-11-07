"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Clock,
  CheckCircle2,
  PhoneCall,
  Search,
  Filter,
  Download,
  Calendar,
  Eye,
  FileSpreadsheet,
  LogOut,
  RefreshCw,
  Shield,
  MessageSquare,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { BrandLogo } from "@/shared/components/brand/BrandLogo";

interface ConsentRecord {
  id: string;
  purpose: string;
  status: string;
  policyVersion: string;
  consentedAt: string;
  withdrawnAt?: string;
  ipHash?: string;
}

interface Activity {
  id: string;
  activityType: string;
  description: string;
  performedBy: string;
  createdAt: string;
}

interface Contact {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  message?: string;
  inquiryType: string;
  source: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  consentRecords: ConsentRecord[];
  activities?: Activity[];
  _count?: { activities: number };
}

interface DashboardStats {
  totalContacts: number;
  newContacts: number;
  followingUp: number;
  resolved: number;
  marketingConsents: number;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  NEW: { label: "Mới tiếp nhận", color: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
  CONTACTED: { label: "Đã liên hệ", color: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  FOLLOWING_UP: { label: "Đang theo dõi", color: "bg-purple-500/10 text-purple-400 border-purple-500/30" },
  RESOLVED: { label: "Hoàn tất", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  ARCHIVED: { label: "Lưu trữ", color: "bg-stone-500/10 text-stone-400 border-stone-500/30" },
};

const INQUIRY_LABELS: Record<string, string> = {
  TABLE_RESERVATION: "Đặt bàn trước",
  GENERAL_INQUIRY: "Tư vấn chung",
  COFFEE_PRODUCT: "Mua cà phê rang mộc",
  EVENT_WORKSHOP: "Sự kiện / Workshop",
};

export default function AdminContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [inquiryFilter, setInquiryFilter] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Details Modal
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Fetch Contacts
  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "15",
      });
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (inquiryFilter !== "ALL") params.set("inquiryType", inquiryFilter);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      const res = await fetch(`/api/admin/contacts?${params.toString()}`);
      if (res.status === 401) {
        toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
        router.push("/login");
        return;
      }

      const json = await res.json();
      if (json.success && json.data) {
        setContacts(json.data.items || []);
        setTotalPages(json.data.totalPages || 1);
        setTotalRecords(json.data.total || 0);
        if (json.data.stats) {
          setStats(json.data.stats);
        }
      } else {
        toast.error(json.message || "Lỗi tải dữ liệu liên hệ.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Không thể kết nối đến máy chủ.");
    } finally {
      setIsLoading(false);
    }
  }, [page, search, statusFilter, inquiryFilter, startDate, endDate, router]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Fetch full contact details for Modal
  const openContactDetails = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`);
      const json = await res.json();
      if (json.success && json.data) {
        setSelectedContact(json.data);
        setNewStatus(json.data.status);
        setIsDetailsOpen(true);
      } else {
        toast.error("Không thể tải chi tiết liên hệ.");
      }
    } catch {
      toast.error("Lỗi khi mở thông tin chi tiết.");
    }
  };

  // Update Status
  const handleUpdateStatus = async () => {
    if (!selectedContact) return;
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/contacts/${selectedContact.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          note: statusNote.trim() || undefined,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Cập nhật trạng thái thành công!");
        setStatusNote("");
        openContactDetails(selectedContact.id);
        fetchContacts();
      } else {
        toast.error(json.message || "Không thể cập nhật trạng thái.");
      }
    } catch {
      toast.error("Lỗi cập nhật trạng thái.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Add Follow-up Note
  const handleAddNote = async () => {
    if (!selectedContact || !newNote.trim()) return;
    setIsAddingNote(true);
    try {
      const res = await fetch(`/api/admin/contacts/${selectedContact.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityType: "NOTE_ADDED",
          description: newNote.trim(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Đã ghi nhận chăm sóc khách hàng!");
        setNewNote("");
        openContactDetails(selectedContact.id);
      } else {
        toast.error(json.message || "Lỗi khi thêm ghi chú.");
      }
    } catch {
      toast.error("Lỗi ghi nhận hoạt động.");
    } finally {
      setIsAddingNote(false);
    }
  };

  // Export Excel
  const handleExportExcel = async () => {
    setIsExporting(true);
    toast.loading("Đang kết xuất sổ cái Excel...", { id: "excel-export" });
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (inquiryFilter !== "ALL") params.set("inquiryType", inquiryFilter);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      const res = await fetch(`/api/admin/contacts/export?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Export failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ahien-coffee-contacts-${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Xuất file Excel thành công!", { id: "excel-export" });
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Không thể xuất file Excel. Vui lòng thử lại!", { id: "excel-export" });
    } finally {
      setIsExporting(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Đã đăng xuất.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BrandLogo size="sm" showTagline={false} />
          <div className="hidden sm:block h-5 w-px bg-stone-700" />
          <h1 className="text-sm font-semibold text-stone-200">
            Quản Trị Liên Hệ & Dữ Liệu Khách Hàng
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            Xem Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* KPI Summary Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-2xl bg-stone-900 border border-stone-800 p-4">
              <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
                <span>Tổng liên hệ</span>
                <Users size={16} className="text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-serif text-white">{stats.totalContacts}</div>
            </div>

            <div className="rounded-2xl bg-stone-900 border border-amber-500/30 p-4">
              <div className="flex items-center justify-between text-amber-400 text-xs mb-1">
                <span>Mới tiếp nhận</span>
                <Clock size={16} className="text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-serif text-amber-400">{stats.newContacts}</div>
            </div>

            <div className="rounded-2xl bg-stone-900 border border-purple-500/30 p-4">
              <div className="flex items-center justify-between text-purple-400 text-xs mb-1">
                <span>Đang theo dõi</span>
                <PhoneCall size={16} className="text-purple-400" />
              </div>
              <div className="text-2xl font-bold font-serif text-purple-300">{stats.followingUp}</div>
            </div>

            <div className="rounded-2xl bg-stone-900 border border-emerald-500/30 p-4">
              <div className="flex items-center justify-between text-emerald-400 text-xs mb-1">
                <span>Đã xử lý xong</span>
                <CheckCircle2 size={16} className="text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-serif text-emerald-300">{stats.resolved}</div>
            </div>

            <div className="rounded-2xl bg-stone-900 border border-blue-500/30 p-4 col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between text-blue-400 text-xs mb-1">
                <span>Đồng ý Marketing</span>
                <Shield size={16} className="text-blue-400" />
              </div>
              <div className="text-2xl font-bold font-serif text-blue-300">{stats.marketingConsents}</div>
            </div>
          </div>
        )}

        {/* Action & Filter Toolbar */}
        <div className="rounded-2xl bg-stone-900 border border-stone-800 p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-3 text-stone-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Tìm theo Tên, Số điện thoại hoặc Email..."
                className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Action Buttons: Refresh + Export Excel */}
            <div className="flex items-center gap-3">
              <button
                onClick={fetchContacts}
                disabled={isLoading}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                title="Làm mới dữ liệu"
              >
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              </button>

              <button
                onClick={handleExportExcel}
                disabled={isExporting || totalRecords === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <FileSpreadsheet size={16} />
                {isExporting ? "Đang xuất..." : "Xuất Báo Cáo Excel (.xlsx)"}
              </button>
            </div>
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-stone-800/80 text-xs">
            <div>
              <label className="block text-stone-400 mb-1 font-medium">Trạng thái</label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-2.5 py-1.5 text-stone-200"
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="NEW">Mới tiếp nhận</option>
                <option value="CONTACTED">Đã liên hệ</option>
                <option value="FOLLOWING_UP">Đang theo dõi</option>
                <option value="RESOLVED">Hoàn tất</option>
                <option value="ARCHIVED">Lưu trữ</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-400 mb-1 font-medium">Loại yêu cầu</label>
              <select
                value={inquiryFilter}
                onChange={(e) => {
                  setInquiryFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-2.5 py-1.5 text-stone-200"
              >
                <option value="ALL">Tất cả loại yêu cầu</option>
                <option value="TABLE_RESERVATION">Đặt bàn trước</option>
                <option value="GENERAL_INQUIRY">Tư vấn chung</option>
                <option value="COFFEE_PRODUCT">Mua cà phê rang mộc</option>
                <option value="EVENT_WORKSHOP">Sự kiện / Workshop</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-400 mb-1 font-medium">Từ ngày</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-2 py-1.5 text-stone-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1 font-medium">Đến ngày</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-2 py-1.5 text-stone-200 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-stone-950 border-b border-stone-800 text-[11px] text-stone-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Khách Hàng</th>
                  <th className="py-3.5 px-4 font-semibold">Số Điện Thoại</th>
                  <th className="py-3.5 px-4 font-semibold">Loại Yêu Cầu</th>
                  <th className="py-3.5 px-4 font-semibold">Trạng Thái</th>
                  <th className="py-3.5 px-4 font-semibold">Bằng Chứng Đồng Ý</th>
                  <th className="py-3.5 px-4 font-semibold">Thời Gian Gửi</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-stone-500">
                      <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-amber-500" />
                      Đang tải danh sách liên hệ...
                    </td>
                  </tr>
                ) : contacts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-stone-500">
                      Không tìm thấy liên hệ nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  contacts.map((c) => {
                    const statusConfig = STATUS_LABELS[c.status] || STATUS_LABELS.NEW;
                    const hasMarketingConsent = c.consentRecords?.some(
                      (r) => r.purpose === "MARKETING_COMMUNICATION" && r.status === "GRANTED"
                    );

                    return (
                      <tr key={c.id} className="hover:bg-stone-850/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-stone-100">{c.fullName}</div>
                          {c.email && <div className="text-[11px] text-stone-500">{c.email}</div>}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-amber-300">{c.phone}</td>
                        <td className="py-3.5 px-4">
                          <span className="text-stone-300 font-medium">
                            {INQUIRY_LABELS[c.inquiryType] || c.inquiryType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${statusConfig.color}`}
                          >
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-medium"
                              title="Đã đồng ý xử lý yêu cầu liên hệ"
                            >
                              Vận hành: Đạt
                            </span>
                            {hasMarketingConsent ? (
                              <span
                                className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-medium"
                                title="Đồng ý nhận tin Marketing"
                              >
                                Mkt: Có
                              </span>
                            ) : (
                              <span
                                className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-500 text-[10px]"
                                title="Không chọn nhận tin Marketing"
                              >
                                Mkt: Không
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-stone-400 text-[11px]">
                          {new Date(c.createdAt).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => openContactDetails(c.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-medium transition-colors cursor-pointer"
                          >
                            <Eye size={13} />
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-stone-950 border-t border-stone-800 text-xs text-stone-400">
              <div>
                Trang {page} / {totalPages} (Tổng số: {totalRecords} liên hệ)
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Details & Interaction Modal */}
      {isDetailsOpen && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 text-stone-200 shadow-2xl">
            <button
              onClick={() => setIsDetailsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6 border-b border-stone-800 pb-4">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-semibold mb-2 ${
                  STATUS_LABELS[selectedContact.status]?.color
                }`}
              >
                {STATUS_LABELS[selectedContact.status]?.label}
              </span>
              <h3 className="text-xl font-bold font-serif text-white">
                {selectedContact.fullName}
              </h3>
              <div className="flex flex-wrap gap-4 text-xs text-stone-400 mt-1">
                <span>SĐT: <strong className="text-amber-300 font-mono">{selectedContact.phone}</strong></span>
                {selectedContact.email && <span>Email: {selectedContact.email}</span>}
                <span>Loại: {INQUIRY_LABELS[selectedContact.inquiryType] || selectedContact.inquiryType}</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="mb-6 rounded-2xl bg-stone-950 p-4 border border-stone-800/80">
              <h4 className="text-xs font-semibold text-stone-400 mb-1.5 flex items-center gap-1.5">
                <MessageSquare size={14} className="text-amber-400" />
                Nội dung yêu cầu từ khách hàng:
              </h4>
              <p className="text-sm text-stone-200 whitespace-pre-wrap leading-relaxed">
                {selectedContact.message || "(Khách hàng không để lại tin nhắn bổ sung)"}
              </p>
            </div>

            {/* Consent Evidence Audit */}
            <div className="mb-6 rounded-2xl bg-stone-950 p-4 border border-amber-500/20 space-y-2">
              <h4 className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <Shield size={14} />
                Bằng chứng đồng ý pháp lý (Luật 91/2025/QH15)
              </h4>
              <div className="space-y-1.5 text-xs text-stone-300">
                {selectedContact.consentRecords?.map((r) => (
                  <div key={r.id} className="flex flex-wrap items-center justify-between p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <div>
                      <strong>{r.purpose === "OPERATIONAL_INQUIRY" ? "Xử lý liên hệ/đặt bàn" : "Tiếp thị & Khuyến mãi"}</strong>:{" "}
                      <span className={r.status === "GRANTED" ? "text-emerald-400" : "text-red-400"}>
                        {r.status === "GRANTED" ? "Đã đồng ý" : "Đã rút lại"}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      Phiên bản: {r.policyVersion} • {new Date(r.consentedAt).toLocaleString("vi-VN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Update Status Controls */}
            <div className="mb-6 rounded-2xl bg-stone-950 p-4 border border-stone-800 space-y-3">
              <h4 className="text-xs font-semibold text-stone-300">Cập nhật trạng thái xử lý:</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100"
                >
                  <option value="NEW">Mới tiếp nhận</option>
                  <option value="CONTACTED">Đã liên hệ</option>
                  <option value="FOLLOWING_UP">Đang theo dõi</option>
                  <option value="RESOLVED">Hoàn tất</option>
                  <option value="ARCHIVED">Lưu trữ</option>
                </select>
                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Ghi chú cập nhật trạng thái..."
                  className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100"
                />
                <button
                  onClick={handleUpdateStatus}
                  disabled={isUpdatingStatus}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  {isUpdatingStatus ? "Đang lưu..." : "Cập nhật"}
                </button>
              </div>
            </div>

            {/* Activity History Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-stone-300">Lịch sử tương tác & chăm sóc:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedContact.activities?.map((a) => (
                  <div key={a.id} className="p-3 rounded-xl bg-stone-950 border border-stone-800/60 text-xs">
                    <div className="flex justify-between text-stone-500 text-[10px] mb-1">
                      <span>{a.performedBy}</span>
                      <span>{new Date(a.createdAt).toLocaleString("vi-VN")}</span>
                    </div>
                    <div className="text-stone-300">{a.description}</div>
                  </div>
                ))}
              </div>

              {/* Add Note Input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Thêm ghi chú chăm sóc khách hàng mới..."
                  className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
                />
                <button
                  onClick={handleAddNote}
                  disabled={isAddingNote || !newNote.trim()}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold text-xs transition-colors disabled:opacity-40"
                >
                  {isAddingNote ? "Đang lưu..." : "Thêm ghi chú"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

