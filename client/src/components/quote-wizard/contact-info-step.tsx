import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export function ContactInfoStep() {
  const { t } = useTranslation();
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Your Contact Information
        </h3>
        <p className="text-sm text-muted">
          Please provide your details to receive the quote
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title <span className="text-accent">*</span></FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-title">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mr">Mr. (นาย)</SelectItem>
                  <SelectItem value="mrs">Mrs. (นาง)</SelectItem>
                  <SelectItem value="miss">Miss (นางสาว)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender <span className="text-accent">*</span></FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-gender">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male (ชาย)</SelectItem>
                  <SelectItem value="female">Female (หญิง)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name <span className="text-accent">*</span></FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} data-testid="input-first-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name <span className="text-accent">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} data-testid="input-last-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="birthDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Birth Date <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <Input type="date" {...field} data-testid="input-birth-date" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="idCard"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID Card Number <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <Input placeholder="1-2345-67890-12-3" {...field} data-testid="input-id-card" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <Input type="tel" placeholder="08-1234-5678" {...field} data-testid="input-phone" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <Input type="email" placeholder="example@email.com" {...field} data-testid="input-email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <Textarea placeholder="House number, Street, District" rows={3} {...field} data-testid="textarea-address" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province <span className="text-accent">*</span></FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-province">
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bangkok">Bangkok (กรุงเทพมหานคร)</SelectItem>
                  <SelectItem value="chiangmai">Chiang Mai (เชียงใหม่)</SelectItem>
                  <SelectItem value="phuket">Phuket (ภูเก็ต)</SelectItem>
                  <SelectItem value="chonburi">Chonburi (ชลบุรี)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code <span className="text-accent">*</span></FormLabel>
              <FormControl>
                <Input placeholder="10110" {...field} data-testid="input-postal-code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="occupation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Occupation <span className="text-accent">*</span></FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger data-testid="select-occupation">
                  <SelectValue placeholder="Select Occupation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="employee">Employee (พนักงานบริษัท)</SelectItem>
                <SelectItem value="government">Government (ข้าราชการ)</SelectItem>
                <SelectItem value="business">Business Owner (ธุรกิจส่วนตัว)</SelectItem>
                <SelectItem value="freelance">Freelance (อาชีพอิสระ)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="agreeTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-primary/5 border-2 border-primary/20 rounded-lg">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                data-testid="checkbox-terms"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">Terms and Conditions</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
