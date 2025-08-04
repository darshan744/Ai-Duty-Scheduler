import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createVenue } from "@/api/admin";
import { toast } from "sonner";

export interface VenueFormData {
  venueName: string;
  location: string;
  capacity: number;
  type?: "hall" | "lab" | "classroom" | "auditorium" | "other";
  facilities: string;
}

export function AddVenueCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VenueFormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: VenueFormData) => {
    setLoading(true);

    const payload = {
      ...data,
      capacity: Number(data.capacity),
    };

    try {
      // Replace with your actual POST logic
      const response = await createVenue(payload);

      toast.success(response.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <Card className="w-full max-w-md p-4">
      <CardHeader>
        <CardTitle>Add New Venue</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Venue Name</Label>
            <Input {...register("venueName", { required: true })} />
            {errors.venueName && (
              <p className="text-sm text-red-500">Required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input {...register("location", { required: true })} />
            {errors.location && (
              <p className="text-sm text-red-500">Required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Capacity</Label>
            <Input
              type="number"
              {...register("capacity", { required: true, min: 1 })}
            />
            {errors.capacity && (
              <p className="text-sm text-red-500">Invalid capacity</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select {...register("type")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="hall">Hall</SelectItem>
                  <SelectItem value="lab">Lab</SelectItem>
                  <SelectItem value="classroom">Classroom</SelectItem>
                  <SelectItem value="auditorium">Auditorium</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Facilities (comma-separated)</Label>
            <Textarea
              placeholder="e.g. Projector, WiFi, Air Conditioning"
              {...register("facilities")}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Adding..." : "Add Venue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
