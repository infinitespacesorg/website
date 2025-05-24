'use client'
import Image from "next/image"; 
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import Link from 'next/link';

export default function DropZone() {
  return (
      <div>
          <h3>Upload Files</h3>
          <FileUploadDemo />
      </div>

  );
} 

const FileUploadDemo = () => {
    const props = useSupabaseUpload({
      bucketName: 'media',
      path: 'uploads',
      allowedMimeTypes: ['image/*', 'video/*'],
      maxFiles: 2,
      maxFileSize: 1000 * 1000 * 100, // 10MB,
    })
    return (
      <div className="w-[500px]">
        <Dropzone {...props}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </div>
    )
  } 

   
  export { FileUploadDemo }
  
  
