//Use 'Record/Learn' button to begin test recording

function Test(params)
{


	RVL.DoPlayScript("%WORKDIR%\\Membership\\Validate Renewal Invoice generated\\Main.rvl.xlsx", Tester.GetParam("sheetName", "RVL"));
}

g_load_libraries=["%g_browserLibrary%"]

