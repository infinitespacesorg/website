'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/browser'
import { Project } from '@/types'

export function useProjectImages(projects: Project[]) {
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchUrls = async () => {
      const entries = await Promise.all(
        projects.map(async (project) => {
          if (!project.project_profile_image) return [project.id, null]

          const filePath = project.project_profile_image.split('project-images/')[1]

          const { data, error } = await supabase.storage
            .from('project-images')
            .createSignedUrl(filePath, 300) // 5 min expiry

          if (error) {
            console.warn(`Could not get signed URL for ${project.id}:`, error)
            return [project.id, null]
          }

          return [project.id, data.signedUrl]
        })
      )

      setSignedUrls(Object.fromEntries(entries))
    }

    fetchUrls()
  }, [projects])

  return signedUrls
}
