import React, { useEffect, useState } from 'react';
import { BlogFormComponent } from './components/BlogForm';
import { BlogList } from './components/BlogList';
import { BlogForm, PageResponse } from './types/blog';
import { blogApi } from './services/api';
import { Toaster, toast } from 'react-hot-toast';
import { Pagination } from './components/Pagination';

function App() {
  const [blogs, setBlogs] = useState<BlogForm[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogForm | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadBlogs(currentPage);
  }, [currentPage]);

  const loadBlogs = async (page: number) => {
    try {
      setIsLoading(true);
      console.log('App - Fetching blogs for page:', page);
      const response = await blogApi.getAll(page);
      console.log('App - Received blogs response:', response);
      
      if (response && 'content' in response) {
        const pageResponse = response as PageResponse<BlogForm>;
        console.log('App - Setting blogs from content:', pageResponse.content);
        setBlogs(pageResponse.content);
        setTotalPages(pageResponse.totalPages);
      } else {
        console.error('App - Unexpected response format:', response);
        setBlogs([]);
        toast.error('Error en el formato de la respuesta');
      }
    } catch (error) {
      console.error('App - Error loading blogs:', error);
      toast.error('Error al cargar los blogs');
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: Omit<BlogForm, 'id'>) => {
    setIsLoading(true);
    try {
      console.log('App - Submitting blog data:', data);
      if (selectedBlog?.id) {
        await blogApi.update(selectedBlog.id, data);
        toast.success('Blog actualizado exitosamente');
      } else {
        await blogApi.create(data);
        toast.success('Blog creado exitosamente');
      }
      await loadBlogs(currentPage);
      setSelectedBlog(undefined);
    } catch (error) {
      console.error('App - Error submitting blog:', error);
      toast.error('La operación falló');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (blog: BlogForm) => {
    console.log('App - Editing blog:', blog);
    setSelectedBlog(blog);
  };

  const handleDelete = async (id: string) => {
    try {
      console.log('App - Deleting blog:', id);
      await blogApi.delete(id);
      toast.success('Blog eliminado exitosamente');
      await loadBlogs(currentPage);
    } catch (error) {
      console.error('App - Error deleting blog:', error);
      toast.error('Error al eliminar el blog');
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">
              {selectedBlog ? 'Editar Blog' : 'Crear Blog'}
            </h2>
            <BlogFormComponent
              initialData={selectedBlog}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
            <BlogList
              blogs={blogs}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App