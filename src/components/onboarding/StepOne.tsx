
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Building2, Users, Globe2 } from 'lucide-react';

const StepOne = () => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Company Details</h2>
        <p className="text-muted-foreground">
          Tell us about your organization to tailor the platform to your needs.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <Building2 size={48} className="text-primary mb-4" />
          <h3 className="font-medium mb-2">Company Profile</h3>
          <p className="text-sm text-muted-foreground">
            Set up your company details and industry information
          </p>
        </Card>
        
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <Users size={48} className="text-primary/80 mb-4" />
          <h3 className="font-medium mb-2">Team Members</h3>
          <p className="text-sm text-muted-foreground">
            You'll be able to invite team members after setup
          </p>
        </Card>
        
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <Globe2 size={48} className="text-primary/60 mb-4" />
          <h3 className="font-medium mb-2">Workspace Settings</h3>
          <p className="text-sm text-muted-foreground">
            Custom settings will be available in the admin panel
          </p>
        </Card>
      </div>
      
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              placeholder="https://example.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company-size">Company Size</Label>
            <Select value={companySize} onValueChange={setCompanySize}>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-500">201-500 employees</SelectItem>
                <SelectItem value="501-1000">501-1000 employees</SelectItem>
                <SelectItem value="1000+">1000+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Company Description</Label>
          <Textarea
            id="description"
            placeholder="Briefly describe your company and its main products or services"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
