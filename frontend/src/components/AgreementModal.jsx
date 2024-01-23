const AgreementModal = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md z-50">
      <p>Please agree to the user terms.</p>
      <button className="mt-2 px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded">
        Close
      </button>
    </div>
  );
};

export default AgreementModal;
