import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface VoteRecord {
  id?: string;
  voter: string;
  answers: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

// 获取所有投票
export async function getVotes(): Promise<VoteRecord[]> {
  const { data, error } = await supabase
    .from('jeju_votes')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('获取投票失败:', error);
    return [];
  }
  return data || [];
}

// 提交或更新投票（同名覆盖）
export async function submitVote(voter: string, answers: Record<string, string>) {
  // 先查是否已有该投票者的记录
  const { data: existing } = await supabase
    .from('jeju_votes')
    .select('id')
    .eq('voter', voter)
    .maybeSingle();

  if (existing) {
    // 更新
    const { error } = await supabase
      .from('jeju_votes')
      .update({ answers, updated_at: new Date().toISOString() })
      .eq('id', existing.id);
    if (error) throw error;
  } else {
    // 新增
    const { error } = await supabase
      .from('jeju_votes')
      .insert({ voter, answers });
    if (error) throw error;
  }
}

// 清空所有投票
export async function clearAllVotes() {
  const { error } = await supabase
    .from('jeju_votes')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // 删除所有
  if (error) throw error;
}
