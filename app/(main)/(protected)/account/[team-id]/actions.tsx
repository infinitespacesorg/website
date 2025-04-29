import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UUID } from "crypto";

export const getAllTeamAccountsAction = async (teamId: string) => {

    const supabase = await createSupabaseServerClient();

    const { data: allTeamAccounts, error: allTeamAccountsError } = await supabase.from('team_accounts').select('*').eq('id', teamId)

    if (allTeamAccountsError || !allTeamAccounts) {
        console.error(allTeamAccountsError)
        throw new Error('Failed to fetch team accounts')
    }

    const allIDs = allTeamAccounts.map((acc) => acc.id)

    const { data: allTeamUsers, error: allTeamUsersError } = await supabase.from('accounts').select('*').in('id', allIDs)

    if (allTeamUsersError || !allTeamUsers) {
        console.error(allTeamUsersError)
        throw new Error('Failed to fetch team accounts')
    }

    return [allTeamAccounts, allTeamUsers]

}