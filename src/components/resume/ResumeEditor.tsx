
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeEditorProps {
  templateName: string;
  onSave: () => void;
  onDownload: () => void;
}

export const ResumeEditor = ({ templateName, onSave, onDownload }: ResumeEditorProps) => {
  const { toast } = useToast();
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Smith",
    title: "Software Engineer",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    summary: "Experienced software engineer with over 5 years of experience in full-stack development. Proficient in React, TypeScript, and Node.js with a strong background in building scalable web applications and services.",
  });

  const [experiences, setExperiences] = useState([
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "2020",
      endDate: "Present",
      description: "Led the development of the company's flagship product. Implemented CI/CD pipeline reducing deployment time by 50%. Mentored junior developers and conducted code reviews.",
    },
  ]);

  const [education, setEducation] = useState([
    {
      degree: "B.S. Computer Science",
      school: "University of Technology",
      location: "Boston, MA",
      startDate: "2016",
      endDate: "2020",
    },
  ]);

  const [skills, setSkills] = useState([
    "React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker"
  ]);

  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    setExperiences(updatedExperiences);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        degree: "",
        school: "",
        location: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setEducation(updatedEducation);
  };

  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave();
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Editing {templateName}</span>
            <div className="flex gap-2">
              <Button onClick={handleSave} variant="outline" size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button onClick={onDownload} variant="default" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  value={personalInfo.title}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                rows={4}
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Work Experience</h3>
              <Button onClick={handleAddExperience} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </div>
            {experiences.map((experience, index) => (
              <div key={index} className="border p-4 rounded-md relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleRemoveExperience(index)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      value={experience.title}
                      onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={experience.company}
                      onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={experience.location}
                      onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        value={experience.startDate}
                        onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        value={experience.endDate}
                        onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={3}
                    value={experience.description}
                    onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Education</h3>
              <Button onClick={handleAddEducation} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </div>
            {education.map((edu, index) => (
              <div key={index} className="border p-4 rounded-md relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleRemoveEducation(index)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>School</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={edu.location}
                      onChange={(e) => handleEducationChange(index, "location", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <div key={index} className="bg-muted px-3 py-1 rounded-full flex items-center">
                  <span className="text-sm mr-2">{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
              />
              <Button onClick={handleAddSkill} variant="outline">Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
