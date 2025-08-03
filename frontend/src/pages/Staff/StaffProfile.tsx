import { useForm, type SubmitHandler } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getUserData, patchUserData } from "@/api/staff";
import type { EditableInputs, IUser } from "@/lib/types";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function StaffProfilePage() {
  const [loading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser>({
    name: "",
    createdAt: new Date(),
    email: "",
    phoneNumber: "",
    profileImage: "",
    regNo: "",
    role: "STAFF",
  });
  const { register, handleSubmit, formState } = useForm<EditableInputs>();
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData.data);
      } catch (e) {
        if (e instanceof Error) {
          toast.error("No data Found");
        }
      }
    };

    getProfileData();
  }, []);
  const onSubmit: SubmitHandler<EditableInputs> = (data) => {
    const dirtyFields = formState.dirtyFields;
    const dirtyFieldsKeys = Object.keys(dirtyFields);
    if (dirtyFieldsKeys.length === 0) {
      console.log(dirtyFields);
      toast.info("Nothing changed");
      return;
    }
    const modifiedData: EditableInputs = dirtyFieldsKeys.reduce((acc, key) => {
      acc[key as keyof EditableInputs] = data[key as keyof EditableInputs];
      return acc;
    }, {} as EditableInputs);
    const updatePatch = async () => {
      try {
        setIsLoading(true);
        const response = await patchUserData(modifiedData);
        setUser({ ...user, ...response.data });
        toast.success("Data Updated");
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Couldn't update profile");
        }
      } finally {
        setIsLoading(false);
      }
    };

    updatePatch();
  };
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.profileImage} />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Phone:</span>
            <span className="font-medium text-primary">
              {user.phoneNumber || "No Data Found"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Role:</span>
            <Badge variant="outline">{user.role}</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Joined:</span>
            <span className="text-gray-600">
              {new Date(user.createdAt).toDateString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input {...register("name")} id="name" defaultValue={user.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("email")}
                type="email"
                defaultValue={user.email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phoneNumber")}
                defaultValue={user.phoneNumber}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading && <LoaderCircle className="animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
