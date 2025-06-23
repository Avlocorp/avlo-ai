



// import { useState } from "react"
// import { Modal, Input, Button, Card, Progress, Checkbox, Tag } from "antd"
// import { Search, Plus, Edit, Trash2, Settings, X, GripVertical } from "lucide-react"
// import TextArea from "antd/es/input/TextArea"

// interface Checklist {
//     id: string
//     name: string
//     description: string
//     complianceRate: number
//     criteriaCount: number
//     assignedStages: string[]
// }

// const ChecklistModals = () => {
//     const [isManageModalOpen, setIsManageModalOpen] = useState(false)
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//     const [isStageModalOpen, setIsStageModalOpen] = useState(false)
//     const [searchValue, setSearchValue] = useState("")
//     const [editingChecklist, setEditingChecklist] = useState<Checklist | null>(null)
//     const [checklistName, setChecklistName] = useState("")
//     const [checklistDescription, setChecklistDescription] = useState("")
//     const [criteria, setCriteria] = useState<string[]>([])
//     const [selectedStages, setSelectedStages] = useState<string[]>([])

//     const [checklists, setChecklists] = useState<Checklist[]>([
//         {
//             id: "1",
//             name: "Discovery Call Checklist",
//             description: "Essential criteria for effective discovery calls",
//             complianceRate: 85,
//             criteriaCount: 4,
//             assignedStages: ["Discovery", "Qualification"],
//         },
//         {
//             id: "2",
//             name: "Demo Call Checklist",
//             description: "Key behaviors for product demonstrations",
//             complianceRate: 92,
//             criteriaCount: 4,
//             assignedStages: ["Demo", "Proposal"],
//         },
//     ])

//     const funnelStages = [
//         "Lead",
//         "Qualification",
//         "Discovery",
//         "Demo",
//         "Proposal",
//         "Negotiation",
//         "Closed Won",
//         "Closed Lost",
//     ]

//     const openManageModal = () => {
//         setIsManageModalOpen(true)
//     }

//     const closeManageModal = () => {
//         setIsManageModalOpen(false)
//         setSearchValue("")
//     }

//     const openEditModal = (checklist?: Checklist) => {
//         if (checklist) {
//             setEditingChecklist(checklist)
//             setChecklistName(checklist.name)
//             setChecklistDescription(checklist.description)
//         } else {
//             setEditingChecklist(null)
//             setChecklistName("New Checklist")
//             setChecklistDescription("Description for new checklist")
//         }
//         setIsEditModalOpen(true)
//     }

//     const closeEditModal = () => {
//         setIsEditModalOpen(false)
//         setEditingChecklist(null)
//         setChecklistName("")
//         setChecklistDescription("")
//     }

//     const handleSaveChecklist = () => {
//         // Handle save logic here
//         console.log("Saving checklist:", { checklistName, checklistDescription })
//         closeEditModal()
//     }

//     const handleDeleteChecklist = (id: string) => {
//         setChecklists(checklists.filter((checklist) => checklist.id !== id))
//     }

//     const filteredChecklists = checklists.filter((checklist) =>
//         checklist.name.toLowerCase().includes(searchValue.toLowerCase()),
//     )

//     const addCriterion = () => {
//         setCriteria([...criteria, ""])
//     }

//     const updateCriterion = (index: number, value: string) => {
//         const newCriteria = [...criteria]
//         newCriteria[index] = value
//         setCriteria(newCriteria)
//     }

//     const removeCriterion = (index: number) => {
//         setCriteria(criteria.filter((_, i) => i !== index))
//     }

//     const openStageModal = () => {
//         setIsStageModalOpen(true)
//     }

//     const closeStageModal = () => {
//         setIsStageModalOpen(false)
//     }

//     const handleStageChange = (stage: string, checked: boolean) => {
//         if (checked) {
//             setSelectedStages([...selectedStages, stage])
//         } else {
//             setSelectedStages(selectedStages.filter((s) => s !== stage))
//         }
//     }

//     const handleSaveStageAssignment = () => {
//         console.log("Saving stage assignment:", selectedStages)
//         closeStageModal()
//     }

//     return (
//         <div className="">



//             <Button icon={<Settings className="w-4 h-4" />} onClick={openManageModal} className="flex items-center gap-2">
//                 Manage Checklists
//             </Button>

//             {/* Manage Checklists Modal */}
//             <Modal
//                 title={null}
//                 open={isManageModalOpen}
//                 onCancel={closeManageModal}
//                 centered={true}
//                 footer={null}
//                 width={1000}
//                 className="checklist-modal"
//                 closeIcon={<X className="w-5 h-5 text-gray-400 hover:text-gray-600" />}
//             >

//                 <h2 className="text-lg mb-3 font-semibold text-gray-900">Manage Checklists</h2>



//                 <div className="mb-6 flex items-center justify-between gap-4">
//                     <Input
//                         placeholder="Search checklists..."
//                         value={searchValue}
//                         onChange={(e) => setSearchValue(e.target.value)}
//                         prefix={<Search className="w-4 h-4 text-gray-400" />}
//                         className="w-full h-10"
//                         size="large"
//                     />
//                     <Button
//                         type="primary"
//                         onClick={() => openEditModal()}
//                         className="bg-gray-900 h-10  hover:bg-gray-800 border-gray-900 flex items-center gap-2"
//                     >
//                         <Plus className="w-4 h-4" />

//                         <p>
//                             Create Checklist
//                         </p>

//                     </Button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {filteredChecklists.map((checklist) => (
//                         <Card key={checklist.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-200  ">
//                             <div className="space-y-4 ">
//                                 <div className="flex items-start justify-between">
//                                     <div>
//                                         <h3 className="font-semibold text-lg text-gray-900 mb-1">{checklist.name}</h3>
//                                         <p className="text-sm text-gray-600">{checklist.description}</p>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <Button
//                                             type="text"
//                                             size="large"
//                                             icon={<Edit stroke="#000" className="w-4 h-4" />}
//                                             onClick={() => openEditModal(checklist)}
//                                             className="text-gray-400 hover:text-gray-600"
//                                         />
//                                         <Button
//                                             type="text"
//                                             size="large"
//                                             icon={<Trash2 stroke="red" className="w-4 h-4" />}
//                                             onClick={() => handleDeleteChecklist(checklist.id)}
//                                             className="text-gray-400 hover:text-red-600"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="flex justify-between items-center ">
//                                     <div className="flex items-center justify-between mb-2">
//                                         <span className="text-sm font-semibold text-gray-700">Compliance Rate</span>

//                                     </div>
//                                     <div className="flex items-center gap-2">


//                                         <Progress
//                                             percent={checklist.complianceRate}
//                                             showInfo={false}
//                                             strokeColor={
//                                                 checklist.complianceRate > 0
//                                                     ? "#10b981"

//                                                     : "#ef4444"
//                                             }
//                                             // className="mb-4"
//                                             className="w-16 h-2 top-[-8px]"
//                                         />
//                                         <span className="text-sm font-semibold text-gray-900">{checklist.complianceRate}%</span>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between text-sm">
//                                     <span className="text-gray-600">Criteria</span>
//                                     <span className="font-medium text-gray-900 bg-[#F3F7FB] text-[12px] rounded-xl h-[22px] w-16  text-center">{checklist.criteriaCount} items</span>
//                                 </div>

//                                 <div>
//                                     <div className="text-sm text-gray-600 mb-2">Assigned Stages</div>
//                                     <div className="flex flex-wrap gap-2 mb-4">
//                                         {checklist.assignedStages.map((stage) => (
//                                             <div key={stage} className=" border  text-gray-700 border-gray-200 rounded-xl px-1.5 text-[12px] font-semibold">
//                                                 {stage}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 <Button
//                                     type="default"
//                                     icon={<Settings className="w-4 h-4" />}
//                                     onClick={openStageModal}
//                                     className="w-full flex items-center justify-center gap-2 border-gray-300 text-gray-700 hover:border-gray-400"
//                                 >
//                                     Manage Stages
//                                 </Button>
//                             </div>
//                         </Card>
//                     ))}
//                 </div>
//             </Modal>

//             {/* Edit Checklist Modal */}
//             <Modal
//                 title={null}
//                 open={isEditModalOpen}
//                 onCancel={closeEditModal}
//                 footer={null}
//                 width={600}
//                 className="checklist-modal"
//                 closeIcon={<X className="w-5 h-5 text-gray-400 hover:text-gray-600" />}
//             >
//                 <div className="p-6">
//                     <h2 className="text-xl font-semibold text-gray-900 mb-6">
//                         Edit Checklist: {editingChecklist ? editingChecklist.name : "New Checklist"}
//                     </h2>

//                     <div className="space-y-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Checklist Name</label>
//                             <Input
//                                 value={checklistName}
//                                 onChange={(e) => setChecklistName(e.target.value)}
//                                 placeholder="Enter checklist name"
//                                 size="large"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                             <TextArea
//                                 value={checklistDescription}
//                                 onChange={(e) => setChecklistDescription(e.target.value)}
//                                 placeholder="Enter description"
//                                 rows={4}
//                                 className="resize-none"
//                             />
//                         </div>

//                         <div>
//                             <div className="flex items-center justify-between mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">Criteria</label>
//                                 <Button
//                                     type="primary"
//                                     icon={<Plus className="w-4 h-4" />}
//                                     size="small"
//                                     onClick={addCriterion}
//                                     className="bg-gray-900 hover:bg-gray-800 border-gray-900 flex items-center gap-1"
//                                 >
//                                     Add Criterion
//                                 </Button>
//                             </div>

//                             {criteria.length === 0 ? (
//                                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
//                                     <p className="text-gray-500">No criteria added yet. Click "Add Criterion" to get started.</p>
//                                 </div>
//                             ) : (
//                                 <div className="space-y-3">
//                                     {criteria.map((criterion, index) => (
//                                         <div
//                                             key={index}
//                                             className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white"
//                                         >
//                                             <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
//                                             <Input
//                                                 value={criterion}
//                                                 onChange={(e) => updateCriterion(index, e.target.value)}
//                                                 placeholder="Enter criterion text..."
//                                                 className="flex-1"
//                                             />
//                                             <Button
//                                                 type="text"
//                                                 size="small"
//                                                 icon={<Trash2 className="w-4 h-4" />}
//                                                 onClick={() => removeCriterion(index)}
//                                                 className="text-gray-400 hover:text-red-600"
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
//                         <Button onClick={closeEditModal} className="px-6">
//                             Cancel
//                         </Button>
//                         <Button
//                             type="primary"
//                             onClick={handleSaveChecklist}
//                             className="bg-gray-900 hover:bg-gray-800 border-gray-900 px-6"
//                         >
//                             Save Checklist
//                         </Button>
//                     </div>
//                 </div>
//             </Modal>

//             {/* Assign Funnel Stages Modal */}
//             <Modal
//                 title={null}
//                 open={isStageModalOpen}
//                 onCancel={closeStageModal}
//                 footer={null}
//                 width={500}
//                 className="checklist-modal"
//                 closeIcon={<X className="w-5 h-5 text-gray-400 hover:text-gray-600" />}
//             >
//                 <div className="p-6">
//                     <h2 className="text-xl font-semibold text-gray-900 mb-2">Assign Funnel Stages</h2>
//                     <p className="text-gray-600 mb-6">Select which funnel stages this checklist should apply to.</p>

//                     <div className="space-y-3 mb-6">
//                         {funnelStages.map((stage) => (
//                             <div key={stage} className="flex items-center">
//                                 <Checkbox
//                                     checked={selectedStages.includes(stage)}
//                                     onChange={(e) => handleStageChange(stage, e.target.checked)}
//                                     className="mr-3"
//                                 />
//                                 <span className="text-gray-900">{stage}</span>
//                             </div>
//                         ))}
//                     </div>

//                     {selectedStages.length > 0 && (
//                         <div className="mb-6">
//                             <p className="text-sm text-gray-600 mb-3">Selected: {selectedStages.length} stages</p>
//                             <div className="flex flex-wrap gap-2">
//                                 {selectedStages.map((stage) => (
//                                     <Tag key={stage} color="blue" className="mb-1">
//                                         {stage}
//                                     </Tag>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
//                         <Button onClick={closeStageModal} className="px-6">
//                             Cancel
//                         </Button>
//                         <Button
//                             type="primary"
//                             onClick={handleSaveStageAssignment}
//                             className="bg-gray-900 hover:bg-gray-800 border-gray-900 px-6"
//                         >
//                             Save Assignment
//                         </Button>
//                     </div>
//                 </div>
//             </Modal>
//         </div>
//     )
// }

// export default ChecklistModals

