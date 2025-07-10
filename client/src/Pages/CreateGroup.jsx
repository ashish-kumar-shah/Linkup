// import React, { useState } from "react";

// const people = [
//   { id: 1, name: "Alice Johnson" },
//   { id: 2, name: "Bob Smith" },
//   { id: 3, name: "Charlie Brown" },
//   { id: 4, name: "David Lee" },
// ];

// const CreateGroup = () => {
//   const [groupName, setGroupName] = useState("");
//   const [admin, setAdmin] = useState(null);
//   const [showAdminList, setShowAdminList] = useState(false);

//   const [members, setMembers] = useState([]);
//   const [showMembersList, setShowMembersList] = useState(false);

//   const handleAddMember = (person) => {
//     if (!members.find((m) => m.id === person.id)) {
//       setMembers([...members, person]);
//     }
//   };

//   const handleRemoveMember = (id) => {
//     setMembers(members.filter((m) => m.id !== id));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Group Name:", groupName);
//     console.log("Admin:", admin);
//     console.log("Members:", members);
//     alert(`Group Created!
// Name: ${groupName}
// Admin: ${admin?.name}
// Members: ${members.map((m) => m.name).join(", ")}`);
//   };

//   return (
//     <div className="w-full min-h-screen flex justify-center items-start  ">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-lg  rounded-2xl  p-8 flex flex-col gap-6"
//       >
//         <h1 className="text-3xl font-bold text-gray-800 text-center">
//           Create New Group
//         </h1>

//         {/* Group Name */}
//         <div>
//           <label
//             htmlFor="groupname"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Group Name
//           </label>
//           <input
//             type="text"
//             id="groupname"
//             name="groupname"
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//             placeholder="Enter group name"
//             className="w-full px-4 py-3 border-b-2 border-gray-300   outline-none"
//             required
//           />
//         </div>

//         {/* Admin */}
//         <div className="relative">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Admin
//           </label>
//           <button
//             type="button"
//             onClick={() => setShowAdminList(!showAdminList)}
//             className="w-full flex justify-between items-center px-4 py-3 border-b-2 outline-none"
//           >
//             {admin ? admin.name : "Select Admin"}
//             <svg
//               className={`w-4 h-4 ml-2 transition-transform ${
//                 showAdminList ? "rotate-180" : ""
//               }`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </button>

//           {showAdminList && (
//             <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow z-50 max-h-48 overflow-y-auto">
//               {people.map((person) => (
//                 <div
//                   key={person.id}
//                   onClick={() => {
//                     setAdmin(person);
//                     setShowAdminList(false);
//                   }}
//                   className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
//                 >
//                   {person.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Members */}
//         <div className="relative">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Members
//           </label>
//           <button
//             type="button"
//             onClick={() => setShowMembersList(!showMembersList)}
//             className="w-full flex justify-between items-center px-4 py-3 border outline-none"
//           >
//             Add Members
//             <svg
//               className={`w-4 h-4 ml-2 transition-transform ${
//                 showMembersList ? "rotate-180" : ""
//               }`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </button>

//           {showMembersList && (
//             <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow z-50 max-h-48 overflow-y-auto">
//               {people.map((person) => (
//                 <div
//                   key={person.id}
//                   onClick={() => handleAddMember(person)}
//                   className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
//                 >
//                   {person.name}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Selected Members */}
//           {members.length > 0 && (
//             <div className="mt-3 flex flex-wrap gap-2">
//               {members.map((m) => (
//                 <span
//                   key={m.id}
//                   className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
//                 >
//                   {m.name}
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveMember(m.id)}
//                     className="ml-2 text-blue-600 hover:text-red-500"
//                   >
//                     ✕
//                   </button>
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
//         >
//           Create Group
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateGroup;
import React from 'react'

const CreateGroup = () => {
  return (
    <div>CreateGroup</div>
  )
}

export default CreateGroup