import PropTypes from "prop-types";
import TermsData from "./TermsData";

const TermsAndConditionsModal = ({ onClose }) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex justify-center items-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-gradient-to-l from-slate-50 to-slate-300 p-6 rounded-lg z-20 w-1/2 max-h-screen overflow-y-auto">
        {/* Your terms and conditions content */}
        <h1 className="text-3xl mb-4 font-semibold text-center text-slate-700">
          User Agreements
        </h1>
        <p className="whitespace-pre-line">
          This User Agreement (“Agreement”) is a legal contract between the
          developers (hereinafter referred as “We”, “Us”, or “Our”) and
          authorized personnel of the Bureau of Jail Management and Penology
          (BJMP) in General Mariano Alvarez, Cavite (hereinafter referred to as
          “Authorized Users” or “You”) governing the use of the Persons Deprived
          of Liberty System.
          <span className="block mt-5">
            By accessing or using the system, you agree to be bound by the terms
            and conditions of this agreement. If you do not agree with these
            terms, please refrain from using the system.
          </span>
        </p>
        <div>
          <h1 className="text-3xl my-10 font-semibold text-center text-slate-700">
            Terms And Conditions
          </h1>
          {TermsData.map((item, index) => (
            <div key={index} className="mb-6">
              <p className="font-semibold text-2xl uppercase">{`${index + 1}. ${
                item.header
              }`}</p>
              <p className="">{`"${item.content}"`}</p>
            </div>
          ))}
        </div>
        {/* Close button */}
        <div className="flex items-center justify-center">
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-gray-400 hover:bg-gray-400 rounded font-semibold "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

TermsAndConditionsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TermsAndConditionsModal;
