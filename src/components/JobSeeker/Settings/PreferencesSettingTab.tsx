import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { FileText, Megaphone, Star } from "lucide-react";
const PreferencesSettingTab = () => {
  return (
    <Card>
      <CardContent>
        <div className="space-y-3 mb-4 mt-4">
          <div>
            <h3 className="font-bold">Notification Preferences</h3>

            <p className="text-sm text-muted-foreground">
              Manage how and when JobVerse notifies you
            </p>
          </div>
          <div className="flex justify-between items-center  p-4 border-input border-2  rounded-lg">
            <div className="flex items-center gap-5">
              <Star className="hidden md:block" />
              <div className="space-y-1">
                <p className="font-semibold">Job Recommendation Emails</p>
                <p className="text-xs text-muted-foreground">
                  Receive personalized job recommendations in your email
                </p>
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex justify-between items-center  p-4 border-input border-2  rounded-lg">
            <div className="flex items-center gap-5">
              <FileText className="hidden md:block" />
              <div className="space-y-1">
                <p className="font-semibold">Application Updates</p>
                <p className="text-xs text-muted-foreground">
                  Get updates on your job applications in your email
                </p>
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex justify-between items-center  p-4 border-input border-2  rounded-lg">
            <div className="flex items-center gap-5">
              <Megaphone className="hidden md:block" />
              <div className="space-y-1">
                <p className="font-semibold">Marketing Emails</p>
                <p className="text-xs text-muted-foreground">
                  Promotional content and special offers
                </p>
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full  flex justify-end gap-4 ">
          <Button type="button" variant={"secondary"}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default PreferencesSettingTab;
