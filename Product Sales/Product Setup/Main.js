//Use 'Record/Learn' button to begin test recording

function Test(params)
{


	RVL.DoPlayScript("%WORKDIR%\\Product Sales\\Product Setup\\Main.rvl.xlsx", Tester.GetParam("sheetName", "RVL"));
}

g_load_libraries=["%g_browserLibrary%", "DomDynamicsCrm"]

