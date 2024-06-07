import { useState } from 'react';
import { useFirebase } from '../context/Firebase';

function AddListings() {
  const [name, setName] = useState('');
  const [isbnNumber, setIsbnNumber] = useState('');
  const [price, setPrice] = useState('');
  const [coverPic, setCoverPic] = useState(null);

  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (coverPic) {
      await firebase.createListing(name, isbnNumber, price, coverPic);
      alert('Book uploaded succesfully')
    } else {
      console.error('Cover picture not selected.');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPic(e.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Listing</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Book Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your book name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isbnNumber">
            ISBN Number
          </label>
          <input
            type="text"
            name="isbnNumber"
            id="isbnNumber"
            placeholder="Enter ISBN Number"
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Enter price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverPic">
            Cover Picture
          </label>
          <input
            type="file"
            name="coverPic"
            id="coverPic"
            onChange={handleFileChange}
            accept="image/*"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit info
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddListings;
