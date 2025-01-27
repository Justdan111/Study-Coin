import { ArrowLeft, ChevronDown } from 'lucide-react';
import DesktopTitlebar from '../../../../components/header';
import { useState } from 'react';
import { Textarea } from '../../../../components/ui/textarea';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';

interface AssignmentPageForm {
    title: string;
    description: string;
    assignment: File | null;
}

const AssignmentPage = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    const [assignments, setAssignments] = useState([
        { id: 1, title: 'Algebra Basics', description: 'Introduction to Algebra', url: 'http://example.com/algebra', status: 'Pending', createdAt: '2025-01-01', updatedAt: '2025-01-02' },
        { id: 2, title: 'Periodic Table', description: 'Learn the elements', url: 'http://example.com/chemistry', status: 'Completed', createdAt: '2025-01-02', updatedAt: '2025-01-03' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<AssignmentPageForm>({
        title: '',
        description: '',
        assignment: null,
    });
    const [filterOpen, setFilterOpen] = useState(false);
    const [, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const filteredAssignments = assignments.filter((assignment) =>
        ['title', 'description', 'url', 'status', 'createdAt', 'updatedAt']
            .some((key) =>
                assignment[key as keyof typeof assignment]
                    ?.toString()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'text-green-600';
            case 'Pending':
                return 'text-orange-500';
            default:
                return 'text-gray-500';
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement & { files?: FileList };
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Simulate submission process
        try {
            // Simulate an API call
            const newAssignment = {
                id: assignments.length + 1,
                title: formData.title,
                description: formData.description,
                url: 'http://example.com/new-assignment', // Placeholder URL
                status: 'Pending',
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            };

            // Simulate server response delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Add new assignment to the list
            setAssignments((prev) => [...prev, newAssignment]);
            setModalOpen(false);

            // Clear form data
            setFormData({
                title: '',
                description: '',
                assignment: null,
            });
        } catch (err) {
            setError('Failed to submit the assignment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <DesktopTitlebar pageTitle={'Your Assignments'} />
            <div className="mt-2">
                <button
                    onClick={handleGoBack}
                    className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search assignments..."
                    className="flex-1 w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg"
                />

                <div className="relative w-full md:w-auto">
                    <button
                        className="flex items-center justify-between w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                        onClick={() => setFilterOpen((prev) => !prev)}
                    >
                        Filter
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </button>
                    {filterOpen && (
                        <div className="absolute mt-2 w-full md:w-48 bg-white border rounded-lg shadow-lg">
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Status: Completed</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Status: Pending</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Created Today</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Updated This Week</li>
                            </ul>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Upload Assignment
                </button>
            </div>

            {/* Assignments Table */}
            <div className="w-full overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-white text-black text-sm font-light">
                            <th className="px-4 py-4 text-left">TITLE</th>
                            <th className="px-4 py-4 text-left">DESCRIPTION</th>
                            <th className="px-4 py-4 text-left">URL</th>
                            <th className="px-4 py-4 text-left">STATUS</th>
                            <th className="px-4 py-4 text-left">CREATED AT</th>
                            <th className="px-4 py-4 text-left">UPDATED AT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssignments.length > 0 ? (
                            filteredAssignments.map((assignment) => (
                                <tr key={assignment.id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{assignment.title}</td>
                                    <td className="px-4 py-2">{assignment.description}</td>
                                    <td className="px-4 py-2">
                                        <a href={assignment.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                            Link
                                        </a>
                                    </td>
                                    <td className={`px-4 py-2 ${getStatusColor(assignment.status)}`}>{assignment.status}</td>
                                    <td className="px-4 py-2">{assignment.createdAt}</td>
                                    <td className="px-4 py-2">{assignment.updatedAt}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4">
                                    No assignments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3 relative z-10">
                        <h2 className="text-lg font-semibold mb-4">Upload Assignment</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <Label className="block text-sm font-medium mb-1">Description</Label>
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                ></Textarea>
                            </div>
                            <div className="mb-4">
                                <Label className="block text-sm font-medium mb-1">Upload File</Label>
                                <Input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
                                    Cancel
                                </button>
                                <button type="submit" className={`px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded`} disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentPage;