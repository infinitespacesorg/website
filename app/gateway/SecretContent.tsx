import Link from 'next/link';
import DropZone from './DropZone';

export default function SecretContent() {
  return (
    <div>
      <h2>Protected Content</h2>
      <a href="/api/gate-logout" className="bg-gray-600 rounded px-4 py-2 hover:bg-gray-300 transition-colors inline-block mt-2">Logout</a>
      <br/>
      <br/>
      <ul>
        <li><Link href="http://infinitespaces.design/" className="inline-block mb-4 text-blue-600 underline hover:text-blue-800">Presentations</Link></li>
      </ul>
      <br />
      <DropZone />
      <br />
     
    </div>
  );
} 

