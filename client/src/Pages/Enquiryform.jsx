import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";

// Course Data
const courseData = {
  Alagappa: {
    UG: [
      "B.A. Tamil",
      "B.A. English",
      "B.Com (Tamil & English Medium)",
      "B.Com. Computer Applications",
      "B.Sc. Mathematics",
      "B.Sc. Computer Science",
      "B.B.A (Tamil & English Medium)",
    ],
    PG: [
      "M.A. Tamil",
      "M.A. English",
      "M.A. History (Tamil & English Medium)",
      "M.A. Economics (Tamil & English Medium)",
      "M.Sc. Mathematics",
      "M.Sc. Computer Science",
      "M.Sc. Information Technology",
      "M.Sc. Physics",
      "M.Sc. Chemistry",
      "M.Sc. Botany",
      "M.Sc. Zoology",
      "M.Sc. Psychology",
      "M.Sc. Microbiology",
      "M.Com. (Tamil & English Medium)",
      "M.C.A.",
      "M.S.W.",
      "M.Lib.I.Sc (One year Program)",
      "B.Ed. (D.T.Ed Must)",
    ],
    MBA: [
      "Group A – Human Resource Management",
      "Group B – Marketing Management",
      "Group C – Financial Management",
      "Group D – International Business",
      "Group E – Corporate Secretaryship",
      "Group F – Project Management",
      "Group G – Hospital Management",
      "Group H – Tourism Management",
      "Group I – Education Management",
      "Group J – Retail Management",
      "Group K – Technology Management",
      "Group L – Logistics Management",
      "Group M – Corporate Management",
      "Group N – Banking and Finance",
      "Group O – System Management",
      "Group P – Production & Operations Management",
      "Group Q – Co-operative Management",
    ],
    Diploma: [
      "Artificial Intelligence & Machine Learning",
      "Computer Applications",
      "Cyber Security",
      "Montessori Education",
    ],
    Certificate: [
      "Astrology (Tamil Medium Only)",
      "C Programming",
      "Gender Studies",
      "GST",
      "Library & Information Science",
      "Office Automation",
      "Web Designing",
    ],
  },
  Bharathidasan: {
    UG: [
      "B.A. Tamil",
      "B.Lit. Tamil",
      "B.A. English",
      "B.Com. (Tamil & English Medium)",
      "B.Com. (Banking Management)",
      "B.Sc. Mathematics (Tamil & English Medium)",
      "B.A. Economics (Tamil Medium)",
      "B.A. History (Tamil Medium)",
      "B.A. Political Science",
      "B.A. Public Administration",
      "B.B.A. (Tamil & English Medium)",
      "B.Sc. Physics",
      "B.Sc. Chemistry",
      "B.Sc. Botany",
      "B.Sc. Zoology",
      "B.Sc. Geography",
      "B.Sc. Computer Science",
      "B.Sc. Information Technology",
      "B.C.A.",
      "B.Lib.I.Sc. (One year Program)",
    ],
    PG: [
      "M.A. Tamil",
      "M.A. English",
      "M.A. Economics (Tamil Medium)",
      "M.A. History (Tamil Medium)",
      "M.A. Political Science",
      "M.A. Public Administration",
      "M.A. Human Resource Management",
      "M.Sc. Mathematics",
      "M.Sc. Chemistry",
      "M.Sc. Physics",
      "M.Sc. Botany",
      "M.Sc. Zoology",
      "M.Sc. Computer Science",
      "M.Sc. Information Technology",
      "M.Sc. Geography",
      "M.Com.",
      "M.Com. (Banking Management)",
      "M.Com. (Finance Management)",
      "M.Lib.I.Sc. (One year Program)",
    ],
    MBA: ["M.B.A. Business Administration"],
    Diploma: [],
    Certificate: [],
  },
};


const initialFormData = {
  name: "",
  email: "",
  mobile: "",
  university: "",
  course: "",
  message: "",
};

export function EnquiryFormModal({ isOpen, onOpenChange }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "university") {
      setFormData({ ...formData, university: value, course: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(
        "https://azhagappa-website-1.onrender.com/send-email",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Your enquiry has been submitted successfully!");
      setFormData(initialFormData);
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to send enquiry. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCourseGroups = formData.university
    ? courseData[formData.university]
    : {};

  return (
    <>
      <Toaster position="top-right" />

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent
          className="
            w-[95vw] max-w-md sm:max-w-lg md:max-w-xl
            max-h-[90vh] overflow-y-auto
            p-4 sm:p-6
          "
        >
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-semibold text-center">
              Enquiry Form
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-3">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-1">
                <Label>Mobile Number</Label>
                <Input name="mobile" value={formData.mobile} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-1">
              <Label>University</Label>
              <select
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">Select University</option>
                <option value="Alagappa">Alagappa University</option>
                <option value="Bharathidasan">Bharathidasan University</option>
              </select>
            </div>

            {formData.university && (
              <div className="space-y-1">
                <Label>Course Interested</Label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-sm"
                  style={{ maxHeight: "12rem", overflowY: "auto" }}
                >
                  <option value="">Select Course</option>
                  {Object.entries(selectedCourseGroups).map(([category, courses]) =>
                    courses.length > 0 ? (
                      <optgroup key={category} label={category}>
                        {courses.map((course, index) => (
                          <option key={index} value={`${category} – ${course}`}>
                            {course}
                          </option>
                        ))}
                      </optgroup>
                    ) : null
                  )}
                </select>
              </div>
            )}

            <div className="space-y-1">
              <Label>Message</Label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Type your message..."
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
