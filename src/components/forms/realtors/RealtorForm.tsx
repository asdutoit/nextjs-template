"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import provincesAndStates from "@/lib/states.json";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputAutoComplete from "@/components/ui/InputAutoComplete";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { realtorFormSchema } from "@/lib/zod-schemas";
import { useEffect, useState, useCallback } from "react";

export default function RealtorForm() {
  const [provinces, setProvinces] = useState<{ code: string; name: string }[]>(
    []
  );
  const [province, setProvince] = useState<string>("");
  const { toast } = useToast();
  const form = useForm<z.infer<typeof realtorFormSchema>>({
    resolver: zodResolver(realtorFormSchema),
  });

  const handleAutoCompleteSearch = useCallback(
    (result: any) => {
      console.log(result);
      // Set the value of the 'address.optional_address' field to the selected address
      form.setValue("address.street_address_full", result.formattedAddress);
      // Set the values of the other fields
      form.setValue(
        "address.street_address",
        result.addressComponents[1].longText
      );
      form.setValue(
        "address.street_number",
        result.addressComponents[0].shortText
      );
      form.setValue("address.coordinates", result.location);
      form.setValue("address.suburb", result.addressComponents[2].longText);
      form.setValue("address.city", result.addressComponents[3].longText);
      form.setValue(
        "address.postal_code",
        parseInt(result.addressComponents[7].shortText)
      );
      form.setValue("address.country", result.addressComponents[6].shortText);
      setProvince(result.addressComponents[5].shortText);
      // ... set the values of the other fields
    },
    [form.setValue]
  );

  useEffect(() => {
    form.setValue("address.state", province);
  }, [provinces, setProvinces]);

  useEffect(() => {
    const country: keyof typeof provincesAndStates =
      form.getValues("address.country");
    if (country) {
      setProvinces(provincesAndStates[country] || []);
    }
  }, [form.watch("address.country")]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof realtorFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast({
      title: "Form Submitted",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white" style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(values, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Realtor Registration</h3>
        <p className="text-sm text-muted-foreground">
          Register you Realtor Organisation
        </p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      ></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ACME Real Estate"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  This is the Realtor organisation name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row justify-between">
            <FormField
              control={form.control}
              name="registration_number"
              render={({ field }) => (
                <FormItem className="w-full sm:mr-2 mr-0">
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="2024/123123/12"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the Realtor registration number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vat_number"
              render={({ field }) => (
                <FormItem className="w-full sm:ml-2 mt-8 sm:mt-0 ml-0">
                  <FormLabel>VAT Number (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="271010232"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Delete" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight" &&
                          e.key !== "Tab" &&
                          e.key !== "Enter"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the Realtor VAT number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="w-full sm:mt-0">
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.example.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>Realtor Website</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full sm:mx-4 mt-8 sm:mt-0">
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="021 975 1234"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>Realtor Contact Number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full mt-8 sm:mt-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="info@example.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>Realtor Email Address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address.street_address_full"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <InputAutoComplete
                    placeholder="123 Main rd"
                    field={field}
                    onResultSelect={handleAutoCompleteSearch}
                  />
                </FormControl>
                <FormDescription>Realtor Street Address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.optional_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Optional Address Details</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Unit 456, Block 5"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Add additional address details. Example: Apartment number,
                  etc.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row justify-between">
            <FormField
              control={form.control}
              name="address.suburb"
              render={({ field }) => (
                <FormItem className="w-full sm:mr-2 mr-0">
                  <FormLabel>Suburb</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Constantia"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem className="w-full sm:ml-2 mt-8 sm:mt-0 ml-0">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cape Town"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between">
            <FormField
              control={form.control}
              name="address.postal_code"
              render={({ field }) => (
                <FormItem className="w-full sm:mt-0">
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"8000"}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Delete" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight" &&
                          e.key !== "Tab" &&
                          e.key !== "Enter"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem className="w-full sm:mx-4 mt-8 sm:mt-0">
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange({ target: { value } })
                    }
                    // defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Country</SelectLabel>
                        <SelectItem value="ZA">South Africa</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="GB">Great Britan</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem className="w-full mt-8 sm:mt-0">
                  <FormLabel>Province</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      console.log("Changed", value);
                      field.onChange({ target: { value } });
                    }}
                    // defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Provinces</SelectLabel>
                        {provinces.map((province) => (
                          <SelectItem key={province.code} value={province.code}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
