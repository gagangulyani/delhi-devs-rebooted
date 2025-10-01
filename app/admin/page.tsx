'use client'

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, Clock, CheckCircle, XCircle, Ban, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { mockMembers } from '@/lib/mock-data';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedin_profile: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'banned';
  agreed_to_terms: boolean;
  join_mailing_list: boolean;
  created_at: string;
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  banned: number;
  thisMonth: number;
}

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    banned: 0,
    thisMonth: 0
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Use real data if available, otherwise use mock data
      const membersData = (data && data.length > 0) ? data as Member[] : mockMembers;
      setMembers(membersData);
      calculateStats(membersData);
    } catch (error) {
      console.error("Error fetching members:", error);
      // On error, fall back to mock data
      setMembers(mockMembers);
      calculateStats(mockMembers);
      toast({
        title: "Using Demo Data",
        description: "Displaying mock data for demonstration.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const calculateStats = (data: Member[]) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const stats = {
      total: data.length,
      pending: data.filter(m => m.status === 'pending').length,
      approved: data.filter(m => m.status === 'approved').length,
      rejected: data.filter(m => m.status === 'rejected').length,
      banned: data.filter(m => m.status === 'banned').length,
      thisMonth: data.filter(m => new Date(m.created_at) >= startOfMonth).length
    };
    
    setStats(stats);
  };

  const updateMemberStatus = async (memberId: string, newStatus: Member['status']) => {
    setActionLoading(memberId);
    
    try {
      const { error } = await supabase
        .from("members")
        .update({ status: newStatus })
        .eq("id", memberId);

      if (error) throw error;

      // Update local state
      setMembers(prev => 
        prev.map(member => 
          member.id === memberId 
            ? { ...member, status: newStatus }
            : member
        )
      );

      // Recalculate stats
      const updatedMembers = members.map(member => 
        member.id === memberId 
          ? { ...member, status: newStatus }
          : member
      );
      calculateStats(updatedMembers);

      toast({
        title: "Status Updated",
        description: `Member has been ${newStatus}.`,
      });
    } catch (error) {
      console.error("Error updating member status:", error);
      toast({
        title: "Error",
        description: "Failed to update member status.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: Member['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'banned':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200"><Ban className="w-3 h-3 mr-1" />Banned</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage Delhi Devs community members</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Banned</CardTitle>
              <Ban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-800">{stats.banned}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.thisMonth}</div>
            </CardContent>
          </Card>
        </div>

        {/* Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>Member Applications</CardTitle>
            <CardDescription>
              Review and manage membership applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
                <TabsTrigger value="banned">Banned ({stats.banned})</TabsTrigger>
              </TabsList>

              {(['all', 'pending', 'approved', 'rejected', 'banned'] as const).map((status) => (
                <TabsContent key={status} value={status} className="mt-6">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>LinkedIn</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Applied</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members
                          .filter(member => status === 'all' || member.status === status)
                          .map((member) => (
                            <TableRow key={member.id}>
                              <TableCell className="font-medium">{member.name}</TableCell>
                              <TableCell>{member.email}</TableCell>
                              <TableCell>{member.phone}</TableCell>
                              <TableCell>
                                {member.linkedin_profile ? (
                                  <a 
                                    href={member.linkedin_profile} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    View Profile
                                  </a>
                                ) : (
                                  <span className="text-muted-foreground">Not provided</span>
                                )}
                              </TableCell>
                              <TableCell>{getStatusBadge(member.status)}</TableCell>
                              <TableCell>{format(new Date(member.created_at), 'MMM dd, yyyy')}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  {member.status === 'pending' && (
                                    <>
                                      <Button
                                        size="sm"
                                        onClick={() => updateMemberStatus(member.id, 'approved')}
                                        disabled={actionLoading === member.id}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => updateMemberStatus(member.id, 'rejected')}
                                        disabled={actionLoading === member.id}
                                      >
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                  {member.status !== 'banned' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateMemberStatus(member.id, 'banned')}
                                      disabled={actionLoading === member.id}
                                      className="border-red-200 text-red-600 hover:bg-red-50"
                                    >
                                      Ban
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}