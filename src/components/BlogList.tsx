import React, { useEffect } from 'react';
import { BlogForm } from '../types/blog';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  blogs: BlogForm[];
  onEdit: (blog: BlogForm) => void;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function BlogList({ blogs, onEdit, onDelete, isLoading }: Props) {
  useEffect(() => {
    console.log('BlogList - Received blogs:', blogs);
  }, [blogs]);

  if (isLoading) {
    return (
      <div className="mt-8 text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Cargando blogs...</p>
      </div>
    );
  }

  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    console.log('BlogList - blogs is empty array or not an array');
    return (
      <div className="mt-8 text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No hay blogs registrados</p>
      </div>
    );
  }

  console.log('BlogList - Rendering table with blogs:', blogs);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Blogs Registrados ({blogs.length})</h2>
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre Completo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    País
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {blog.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.country}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {blog.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => onEdit(blog)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          title="Editar blog"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => blog.id && onDelete(blog.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Eliminar blog"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}