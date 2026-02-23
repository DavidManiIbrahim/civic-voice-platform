import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
    Users,
    Radio,
    PlusCircle,
    Settings,
    TrendingUp,
    Search,
    MoreVertical,
    Edit,
    Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import HearingForm from "@/components/admin/HearingForm";

export default function AdminDashboard() {
    const { user, isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState<"overview" | "hearings" | "users">("overview");
    const [hearings, setHearings] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [isAddingHearing, setIsAddingHearing] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (isAdmin) {
            fetchHearings();
            fetchUsers();
        }
    }, [isAdmin]);

    const fetchHearings = async () => {
        const { data } = await supabase.from("hearings").select("*").order("scheduled_at", { ascending: false });
        if (data) setHearings(data);
    };

    const updateHearingStatus = async (hearingId: string, newStatus: string) => {
        const { error } = await supabase
            .from("hearings")
            .update({ status: newStatus })
            .eq("id", hearingId);

        if (!error) {
            toast({ title: "Status updated" });
            fetchHearings();
        } else {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    const fetchUsers = async () => {
        const { data } = await supabase.from("profiles").select("*");
        if (data) setUsers(data);
    };

    const updateRole = async (userId: string, newRole: string) => {
        const { error } = await supabase
            .from("profiles")
            .update({ role: newRole })
            .eq("user_id", userId);

        if (!error) {
            toast({ title: "Role updated" });
            fetchUsers();
        } else {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    const deleteUser = async (userId: string) => {
        toast({ title: "Admin Action", description: "User deletion requires Edge Function with service_role." });
    };

    if (!isAdmin) {
        return (
            <Layout>
                <div className="container py-20 text-center">
                    <h1 className="text-2xl font-bold">Access Denied</h1>
                    <p className="mt-2 text-muted-foreground">You must be an administrator to view this page.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-8">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-foreground">Admin Console</h1>
                        <p className="mt-1 text-muted-foreground">Manage legislative hearings, users, and platform settings.</p>
                    </div>
                    <Button onClick={() => setIsAddingHearing(true)} className="gap-2">
                        <PlusCircle className="h-4 w-4" /> New Hearing
                    </Button>
                </div>

                {/* Tabs */}
                <div className="mb-6 flex gap-1 rounded-lg bg-muted p-1 w-fit">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === "overview" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("hearings")}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === "hearings" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        Hearings
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === "users" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        Users
                    </button>
                </div>

                {activeTab === "overview" && (
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                                <Radio className="h-4 w-4" />
                                <span className="text-sm font-medium">Active Hearings</span>
                            </div>
                            <div className="text-2xl font-bold">{hearings.filter(h => h.status === 'live').length}</div>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span className="text-sm font-medium">Total Users</span>
                            </div>
                            <div className="text-2xl font-bold">{users.length}</div>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                                <TrendingUp className="h-4 w-4" />
                                <span className="text-sm font-medium">Avg Engagement</span>
                            </div>
                            <div className="text-2xl font-bold">82%</div>
                        </div>
                    </div>
                )}

                {activeTab === "hearings" && (
                    <div className="rounded-xl border border-border bg-card shadow-card">
                        <div className="border-b border-border p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input placeholder="Search hearings..." className="pl-10" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/50">
                                        <th className="px-4 py-3 font-semibold">Title</th>
                                        <th className="px-4 py-3 font-semibold">Committee</th>
                                        <th className="px-4 py-3 font-semibold">Status</th>
                                        <th className="px-4 py-3 font-semibold">Date</th>
                                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hearings.map(h => (
                                        <tr key={h.id} className="border-b border-border transition-colors hover:bg-muted/30">
                                            <td className="px-4 py-3 font-medium">{h.title}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{h.committee}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase ${h.status === 'live' ? 'bg-destructive/10 text-destructive' :
                                                    h.status === 'upcoming' ? 'bg-info/10 text-info' : 'bg-muted text-muted-foreground'
                                                    }`}>
                                                    {h.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {new Date(h.scheduled_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <select
                                                        className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                                                        value={h.status}
                                                        onChange={(e) => updateHearingStatus(h.id, e.target.value)}
                                                    >
                                                        <option value="upcoming">Upcoming</option>
                                                        <option value="live">Live</option>
                                                        <option value="archived">Archived</option>
                                                    </select>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "users" && (
                    <div className="rounded-xl border border-border bg-card shadow-card">
                        <div className="border-b border-border p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input placeholder="Search participants..." className="pl-10" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/50">
                                        <th className="px-4 py-3 font-semibold">Username</th>
                                        <th className="px-4 py-3 font-semibold">Role</th>
                                        <th className="px-4 py-3 font-semibold">Joined</th>
                                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id} className="border-b border-border transition-colors hover:bg-muted/30">
                                            <td className="px-4 py-3 font-medium">{u.display_name}</td>
                                            <td className="px-4 py-3">
                                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {new Date(u.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 text-right flex justify-end gap-2">
                                                {u.role !== 'admin' && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updateRole(u.user_id, 'admin')}
                                                    >
                                                        Make Admin
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10"
                                                    onClick={() => deleteUser(u.user_id)}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {isAddingHearing && (
                <HearingForm
                    onClose={() => setIsAddingHearing(false)}
                    onSuccess={() => {
                        setIsAddingHearing(false);
                        fetchHearings();
                        toast({ title: "Hearing created successfully" });
                    }}
                />
            )}
        </Layout>
    );
}
