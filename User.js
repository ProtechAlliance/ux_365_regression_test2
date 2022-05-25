//Put your custom functions and variables in this file
function TestInit()
{



}



function LogAssert(/**string*/ msg)
{
	Log(msg);
	Tester.Assert(msg, false);
}

function CrmFindObject(/**string*/ xpath)
{
	for(var i = 0; i < g_objectLookupAttempts; i++)
	{
		var obj = Navigator.Find(xpath);
		if (obj)
		{
			return obj;
		}
		Global.DoSleep(g_objectLookupAttemptInterval);
	}
	return null;
}

/**
 * Launches Dynamics 365 for Sales in a browser. Dynamics365SalesUrl, UserName, Password must be set in Config.xlsx
 */
function ux_Launch()
{
	var url = Global.GetProperty("Dynamics365SalesUrl", "", "%WORKDIR%\\Config.xlsx");
	var usr = Global.GetProperty("UserName", "", "%WORKDIR%\\Config.xlsx");
	var pwd = Global.GetProperty("Password", "", "%WORKDIR%\\Config.xlsx");
	LoginMicrosoftOnline(url, usr, pwd);
}



/**
 * Changes area in the left bottom corner of the dashboard.
 */

function ux_OLDChangeArea(/**string*/ name)
{
    
    Global.DoSleep(1000);
    SeS('G_OpenAreaList').DoClick();
    Global.DoSleep(1000);
    var xpath = "//li[@role='menuitemradio' and .='" + name + "']";
    var obj = CrmFindObject(xpath);
    if (obj)    
    {
        obj.object_name = name;
        Global.DoSleep(1000);
        obj.DoClick();
    }
    else
    {
        LogAssert("ux_ChangeArea: area element is not found: " + name, false);
    }
}

function ux_ChangeArea(/**string*/ name)
{
    
    Global.DoSleep(1000);
    
    var xpath = "//button[@type='button' and @data-id='sitemap-areaSwitcher-expand-btn' and @data-lp-id='sitemap-areaSwitcher-expand-btn' and @id='areaSwitcherId']";
    var obj1 = CrmFindObject(xpath);
    if (obj1)    
    {
        obj1.object_name = name;
        Global.DoSleep(1000);
        obj1.DoClick();
    }
    else
    {
        LogAssert("ux_ChangeArea: area element is not found: " + name, false);
    }
    
    Global.DoSleep(1000);
    var xpath = "//li[@role='menuitemradio' and .='" + name + "']";
    var obj = CrmFindObject(xpath);
    if (obj)    
    {
        obj.object_name = name;
        Global.DoSleep(1000);
        obj.DoClick();
    }
    else
    {
        LogAssert("ux_ChangeArea: area element is not found: " + name, false);
    }
}


/**
 * Opens entity in the site map.
 */
 
 function ux_OpenEntity(/**string*/ entity)
 {
      var xpath = "//span[normalize-space(.)='" + entity + "']";
      var obj = CrmFindObject(xpath);
      if (obj)    
      {
            obj.object_name = entity;
            obj.DoClick();
      }
      else
      {
            LogAssert("ux_OpenEntity: entity element is not found: " + entity, false);
      }     
}

function ux_OLDOpenEntity(/**string*/ entity)
{
	var xpath = "//li[@aria-label='" + entity + "' and contains(@id,'sitemap-entity')]";
	var obj = CrmFindObject(xpath);
	if (obj)	
	{
		obj.object_name = entity;
		obj.DoClick();
	}
	else
	{
		LogAssert("ux_OpenEntity: entity element is not found: " + entity, false);
	}	
}

/**
 * Clicks button on a toolbar.
 */
function ux_ClickButton(/**string*/ name)
{
	var xpath = "//button[@aria-label='" + name + "']";
	var obj = CrmFindObject(xpath);
	if (obj)	
	{
		obj.object_name = name;
		Global.DoSleep(500);
		obj.DoClick();
	}
	else
	{
		LogAssert("ux_ClickButton: button element is not found: " + name, false);
	}
}

/**
 * Clicks Save & Close button when form can be a quick create or standard form.
*/
function ux_SaveandClose()
{
	var xpath = "//button[@aria-label='Save & Close']";
	var obj = CrmFindObject(xpath);
	var xpath2 = "//button[@aria-label='Save and Close']";
	var obj2 = CrmFindObject(xpath2);
	
	if (obj)	
	{
		Global.DoSleep(500);
		obj.DoClick();
	}
	

	
	if (obj2)	
	{
		Global.DoSleep(500);
		obj2.DoClick();
	}
	

}
/**
 * Clicks Save button on a toolbar.
 */
 
 function ux_SaveRecord()
{
	ux_ClickButton('Save (CTRL+S)');
	
}

function ux_OLDSaveRecord()
{
	ux_ClickButton('Save (CTRL+S)');
	var name = 'Save (CTRL+S)'
	var xpath = "//button[@aria-label=" + name + "']";
	var obj = CrmFindObject(xpath);
	if (obj)	
	{
		obj.object_name = name;
		Global.DoSleep(500);
		obj.DoClick();
	}
	else
	{
		LogAssert("ux_ClickButton: Save button element is not found: ", false);
	}
}

/** 
 * Selects tab on the page.
 */
function ux_SelectTab(/**string*/ name)
{
	var xpath = "//li[@role='tab' and @title='" + name + "']";
	var obj = CrmFindObject(xpath);
	if (obj)	
	{
		obj.object_name = name;
		obj.DoClick();
	}
	else
	{
		LogAssert("ux_SelectTab: tab element is not found: " + name, false);
	}
}

/**
 * Selects value from a lookup field.
 * @param field Repository ID of a lookup object.
 * @param value Value to select.
 */
function ux_OLDLookupField(/**objectId*/ field, /**string*/ value) 
{
	var obj = SeS(field);
	if (obj){
	
		obj.DoSetText(value);
		Global.DoSleep(2000);
		var xpath = "//ul[@aria-label='Lookup Search Results']//span[contains(text(),'" + value + "')]"; 
		var item = CrmFindObject(xpath);
		
		if (!item)
		{
			LogAssert("ux_LookupField: item is not found: " + value, false);
		}
		
		item.object_name = value;
		item.DoClick();
		
	}
	else
	{
		LogAssert("ux_LookupField: field is not found: " + field, false);
	}
}


/**
 * Sets value to a date field.
 * @param field Repository ID  of a date object.
 * @param value Date to set.
 */
function ux_SetDate(/**objectId*/ field, /**string*/ value)
{
	var obj = SeS(field);
	if (obj)
	{
		obj.DoClick();
		obj.DoSetText(value);
		obj._DoSendKeys(value);
	}
	else
	{
		LogAssert("ux_SetDate: field is not found: " + field, false);
	}
}

function ux_EditDate (/**objectId*/ field, /**string*/ value)
{
	var obj = SeS(field);
	if (obj)
	{
		obj.DoClick();
		obj.DoSetText(value)
		obj._DoSendKeys("{TAB}");
	}
	else
	{
		LogAssert("ux_SetDate: field is not found: " + field, false);
	}
}


/**
 * Searches for records.
 * @param value Value to search for.
 */
function ux_SearchRecords(/**string*/ value)
{
	var input = CrmFindObject("//input[contains(@id,'quickFind_text')]");
	var button = CrmFindObject("//button[contains(@id,'quickFind_button')]");
	
	if (!input)
	{
		LogAssert("CrmSearchRecords: input field not found");
		return;
	}
	
	if (!button)
	{
		LogAssert("CrmSearchRecords: button field not found");
		return;
	}
	
	
	input.object_name = "SearchField";
	button.object_name = "SearchButton";
	
	input._DoClick();
	input.DoSetText(value);
	button.DoClick();
	Global.DoSleep(1000);
}

/**
 * Navigates to the specified URL and performs login at https://login.microsoftonline.com/
 * Opens a browser if necessary.
 * @param url
 * @param userName
 * @param password
 */
function LoginMicrosoftOnline(/**string*/ url, /**string*/ userName, /**string*/ password)
{
	var o = {
		"UseAnotherAccount": "//div[@id='otherTileText']",
		"UserName": "//input[@name='loginfmt']",
		"Sumbit": "//input[@type='submit']",
		"Password": "//input[@name='passwd' and @type='password']",
		"DontShowAgain": "//input[@name='DontShowAgain']",
		"No": "//input[@type='button' and @id='idBtn_Back']"
	};

	Navigator.Open(url);
	Navigator.SetPosition(0, 0);
	
	Tester.SuppressReport(true);

	try
	{
		if (Navigator.Find(o["UseAnotherAccount"]))
		{
			Navigator.Find(o["UseAnotherAccount"]).DoClick();	
		}
		
		Navigator.Find(o["UserName"]).DoSetText(userName);
		Navigator.Find(o["Sumbit"]).DoClick();
		Global.DoSleep(2000);
		Navigator.Find(o["Password"]).DoSetText(password);
		Navigator.Find(o["Sumbit"]).DoClick();
		Global.DoSleep(2000);
		
		if (Navigator.Find(o["DontShowAgain"]))
		{
			Navigator.Find(o["No"]).DoClick();	
		}
		
		Tester.SuppressReport(false);
		Tester.Message("Logged in as " + userName);
	}
	catch(e)
	{
		Tester.SuppressReport(false);	
		Tester.Message(e.message);
	}
}

/**
 * Saves DOM tree of the current page to dom.xml file.
 */
function ux_SaveDom()
{
	var domTree = Navigator.GetDomTree();
	if (domTree)
	{
		Navigator.SaveDomToXml("dom.xml", domTree);
	}
	else
	{
		Tester.Message("Failed to get DOM tree");
	}
}

/**
 * Writes key/value pair to Output.xlsx
 * @param key
 * @param value
 */
function SetOutputValue(/**string*/ key, /**string*/ value)
{
	Global.SetProperty(key, value, "%WORKDIR%\\Output.xlsx");
}


/**
 * Reads value from Output.xlsx
 * @param key
 * @param [defValue]
 */
function GetOutputValue(/**string*/ key, /**string*/ defValue)
{
	return Global.GetProperty(key, defValue, "%WORKDIR%\\Output.xlsx");
}

function PrintAreaItems()
{
    SeS('G_OpenAreaList').DoClick();
    var xpath = "//li[@role='menuitemcheckbox']";
    var items = Navigator.DOMFindByXPath(xpath, true);
    for(var i = 0; i < items.length; i++)
    {
        var caption = items[i].GetInnerText();
        Tester.Message(caption);
    }
}


function ux_SetText (/**objectId*/ field, /**string*/ value)

{
    {
	var obj = SeS(field);
	if (obj)
	{
		obj._DoClick();
		obj.DoSetText(value);
	}
	else
	{
		LogAssert("ux_SetText: field is not found: " + field, false);
	}
}

}

/**
 * Scrolls to an element with given data-id
 * To find out the data-id you may use //div[@data-id] query in Web Spy.
 */
function ux_ScrollTo(/**string*/ dataId)
{
	var xpath = "//div[@data-id='" + dataId + "']";
	var obj = CrmFindObject(xpath);
	if (obj)	
	{
		obj.object_name = dataId;
		Global.DoSleep(1000);
		obj._DoEnsureVisible()
	}
	else
	{
		LogAssert("ux_ScrollTo: element is not found: " + dataId, false);
	}
}


function OLDux_CheckFieldValue (/**objectId*/ field, /**string*/ FieldName, /**string*/ ExpectedValue)
{	

	var ActualValue = SeS(field).DoDOMGetAttribute('aria-label');;
	
	Tester.Message('Checking '+FieldName);
	
    if( ExpectedValue == ActualValue )
    {
   		Tester.Message('Value is correct: '+ActualValue);
    }
    else
    {
        Tester.Message('Expected Value: '+ExpectedValue);
        LogAssert('Value is incorrect: '+ActualValue, false);
    }
}

function ux_CheckFieldValue (/**objectId*/ field, /**string*/ FieldName, /**string*/ ExpectedValue)
{	

	var ActualValue = SeS(field).GetValue();;
	
	Tester.Message('Checking '+FieldName);
	
    if( ExpectedValue == ActualValue )
    {
   		Tester.Message('Value is correct: '+ActualValue);
    }
    else
    {
        Tester.Message('Expected Value: '+ExpectedValue);
        LogAssert('Value is incorrect: '+ActualValue, false);
    }
}

function ux_CheckInvoiceTotals (/**objectId*/ field, /**string*/ FieldName, /**string*/ ExpectedValue)
{	

	var ActualValue = SeS(field).GetText();;
	
	Tester.Message('Checking '+FieldName);
	
    if( ExpectedValue == ActualValue )
    {
   		Tester.Message('Value is correct: '+ActualValue);
    }
    else
    {
        Tester.Message('Expected Value: '+ExpectedValue);
        LogAssert('Value is incorrect: '+ActualValue, false);
    }
}

function ux_CheckDateValue (/**objectId*/ field, /**string*/ FieldName, /**string*/ ExpectedValue)
{	

	var ActualValue = SeS(field).GetValue();
	
	Tester.Message('Checking '+FieldName);
	
    if( ExpectedValue == ActualValue )
    {
   		Tester.Message('Value is correct: '+ActualValue);
    }
    else
    {
        Tester.Message('Expected Value: '+ExpectedValue);
        LogAssert('Value is incorrect: '+ActualValue, false);
    }
}

function ux_CheckHeaderValue (/**string*/ ExpectedValue)
{	
	var xpath = "//h1[@data-id='header_title']";
	var obj = CrmFindObject(xpath);
	if (obj)	
	{
		var ActualValue = obj.GetTitle();
	}
	
	Tester.Message('Checking Header Value');
	
    if( ExpectedValue == ActualValue )
    {
   		Tester.Message('Value is correct: '+ActualValue);
    }
    else
    {
    	Tester.Message('Expected Value: '+ExpectedValue);
        LogAssert('Value is incorrect: '+ActualValue, false);
    }
}

function ux_OLDCheckHeaderValue (/**objectId*/ field, /**string*/ FieldName, /**string*/ ExpectedValue)
{	

	var ActualValue = SeS(field).GetTitle();
	
	Tester.Message('Checking '+FieldName);
	
    if( ExpectedValue == ActualValue )
    {
   		Tester.Message('Value is correct: '+ActualValue);
    }
    else
    {
    	Tester.Message('Expected Value: '+ExpectedValue);
        LogAssert('Value is incorrect: '+ActualValue, false);
    }
}

function ux_CheckBitField(/**objectId*/ field, /**string*/ FieldName, /**boolean*/ ExpectedValue)
{	

	var ActualValue = SeS(field).GetChecked();
	
	Tester.Message('Checking '+FieldName);
	
    if( ExpectedValue == ActualValue )
    {
   		Tester.Message('Value is correct: '+ActualValue);
    }
    else
    {
        LogAssert('Value is incorrect: '+ActualValue, false);
    }
}


function ux_SelectBatch (/**string*/ BatchNumber)
{
	ux_ClickButton("Select Batch")
    SeS('SelectBatch_SearchBox')._DoClick();
    SeS('SelectBatch_SearchBox').DoSetText(BatchNumber);
    SeS('SelectBatch_SearchIcon')._DoClick();
    SeS('SelectBatch_SearchResults')._DoClick();
    SeS('SelectBatch_Add').DoClick();
    ux_SaveRecord()
}





function ux_OpenInvoiceDetail (/**string*/ description)
{
	var xpath = "//label[contains(@aria-label, '" + description +"')]";
	var obj = CrmFindObject(xpath);
	if (obj)	
	{
		obj.object_name = description;
			obj._DoLDClick();
	}
	else
	{
		LogAssert("OpenInvoiceDetail: description element is not found: " + description, false);
	}	
}

function ux_OLDOpenInvoiceDetail (/**string*/ description)
{
	var xpath = "//div[contains(@title, '" + description +"')]";
	var obj = CrmFindObject(xpath);
	if (obj)	
	{
		obj.object_name = description;
			obj._DoLDClick();
	}
	else
	{
		LogAssert("OpenInvoiceDetail: description element is not found: " + description, false);
	}	
}

function ux_OpenInvoiceDetailWave2 (/**string*/ description)
{
	var xpath = "//label[@title='" + description +"']";
	var obj = CrmFindObject(xpath);
	if (obj)	
	{
		obj.object_name = description;
			obj._DoLDClick();
	}
	else
	{
		LogAssert("OpenInvoiceDetail: description element is not found: " + description, false);
	}	
}


function ux_NewTransaction ()
{

    SeS('Invoice_NewTransactions').DoClick();

	{
		var xpath = "/span[@aria-label='Product Sales']";
		var obj = CrmFindObject(xpath);
		if (obj)
		{
			obj.DoClick();
			Global.DoSleep(1000);
		}
		else
		{
			LogAssert("Search: search element not found", false);
		}
	}

}

function ux_OLDGridSelectAll ()
{	
	
	var xpath = "//span[@role='checkbox' and @aria-label='Toggle selection of all rows']/div/i[@data-icon-name='StatusCircleCheckmark']";
	var obj = CrmFindObject(xpath);
		if (obj)
		{
			obj.DoClick();
		}
		else
		{
			LogAssert("Select All: grid element not found", false);
		}

}

function ux_OLDGridSelectAll ()
{	
	
	var xpath = "//button[@title='Select All']";
	var obj = CrmFindObject(xpath);
		if (obj)
		{
			obj.DoClick();
		}
		else
		{
			LogAssert("Select All: grid element not found", false);
		}

}
function ux_GridDeactivate ()
{
	var xpath = "//button[@aria-label='Deactivate']";
	var obj = CrmFindObject(xpath);
		if (obj)
		{
			obj.DoEnsureVisible();
			obj.DoClick();
		}
		
				var xpath = "//button[@data-lp-id='dialogFooterContainer|ok_id']";
				var obj = CrmFindObject(xpath);
					if (obj)
					{
						obj.DoClick();
					}
		
		else
		{
			LogAssert("Deactivate: grid element not found", false);
		}

}


function ux_ReadyForGLDetail (/**string*/ batch)
{
	var modulestart = batch
	var xpath = "//iframe[@class='UXDialog-iframe']@@@//td[contains(@title, '" + batch + "')]/..//input[contains(@class, 'readyforgl')]"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj._object_name = batch;
        obj.DoClick();
    }
    
    else
    {
    Tester.Assert("Create GL Detail was not found for batch: " + modulestart, false);
    }
    
	

}

function ux_ReadyToPost(/**string*/ batch)
{
	var modulestart = batch
	var xpath = "//iframe[@class='UXDialog-iframe']@@@//td[contains(@title, '" + batch + "')]/..//input[contains(@class, 'readytopost')]"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj._object_name = batch;
        obj.DoClick();
    }
    
    else
    {
    Tester.Assert("Post button was not found for batch: " + modulestart, false);
    }
   	

}

function ux_RunBatchProcess()
{
    SeS('StandardGLDetail_OK').DoClick();
    Global.DoSleep(3000);
    SeS('StandardGLDetail_OK2').DoClick();
    SeS('StandardGLDetail_CLOSE').DoClick();

}



function ux_OpenMenuItem (/**string*/ name)
{
	var xpath = "//iframe[@id='FullPageWebResource']@@@//div[@class='line title' and normalize-space(.)='" + name + "']"
	var obj = CrmFindObject(xpath);
	
	if (obj)
	{
        obj.DoClick();
	}
	
	else
	{
	Tester.Assert("Menu item was NOT found: " + name, false);
	}

}

function ux_CheckSelected (/**string*/ Attribute, /**string*/ FieldName, /**string*/ ExpectedValue)

{
	var xpath = "//select[contains(@id, '" + Attribute + "')]//option[@data-selected='" + ExpectedValue + "']"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj._DoEnsureVisible();
        Tester.Message("Checking: " +FieldName)
        Tester.Assert("Value is correct: " +ExpectedValue, true);
    }
    
    else
    {
    Tester.Message("Checking :" +FieldName)
    Tester.Assert("Value is incorrect. Expected Value: " + ExpectedValue, false);
    }
   	

}

function ux_OpenAssociatedView (/**string*/ record)
{
	var xpath = "//div[@role='grid']//label[normalize-space(.)='" + record + "']";
	var obj = CrmFindObject(xpath);
	if (obj)	
	{
		obj._DoClick();
		obj.DoClick();
	}
	else
	{
		LogAssert("Record not found", false);
	}	
}

function ux_SelectAssociatedView (/**string*/ record)
{
	var xpath = "//div[@role='grid']//label[normalize-space(.)='" + record + "']";
	var obj = CrmFindObject(xpath);
	if (obj)	
	{
		obj.DoClick();
	}
	else
	{
		LogAssert("Record not found", false);
	}	
}

function ux_GridCancelAll ()
{
	var xpathselectall = "//span[@role='checkbox' and @aria-label='Toggle selection of all rows']/div/i[@data-icon-name='StatusCircleCheckmark']";
	var obj = CrmFindObject(xpathselectall);
		if (obj)
		{
			obj.DoClick();
		}
		

					{
						ux_ClickButton('Cancel Selected Detail')
					}
					
					var xpathOK = "//iframe[@id='FullPageWebResource']@@@//button[@id='btnOk']";
					var obj = CrmFindObject(xpathOK);
					if (obj)
					{
						obj.DoClick();
					}
					
		
		else
		{
			LogAssert("Grid element not found", false);
		}

}

function ux_OLDGridCancelAll2 ()
{
	var xpathselectall = "//button[@title='Select All']";
	var obj = CrmFindObject(xpathselectall);
		if (obj)
		{
			obj.DoClick();
		}
		

					{
						ux_ClickButton('Cancel Selected Detail')
					}
					
					var xpathOK = "//iframe[@id='FullPageWebResource']@@@//button[@id='btnOk']";
					var obj = CrmFindObject(xpathOK);
					if (obj)
					{
						obj.DoClick();
					}
					
		
		else
		{
			LogAssert("Grid element not found", false);
		}

}

function ux_OLDGridCancelAll ()
{
	var xpathselectall = "//button[@title='Select All']";
	var obj = CrmFindObject(xpathselectall);
		if (obj)
		{
			obj.DoClick();
		}
		
				var xpathcancel = "//span[@aria-label='Cancel']";
				var obj = CrmFindObject(xpathcancel);
					if (obj)
					{
						Global.DoSleep(1000);
						obj.DoClick();
						Global.DoSleep(2000);
					}
					
					var xpathOK = "//button[normalize-space(.)='OK']";
					var obj = CrmFindObject(xpathOK);
					if (obj)
					{
						obj.DoClick();
					}
					
		
		else
		{
			LogAssert("Grid element not found", false);
		}

}

function ux_GridDeleteAll ()
{
	var xpathselectall = "//span[@role='checkbox' and @aria-label='Toggle selection of all rows']/div/i[@data-icon-name='StatusCircleCheckmark']";
	var obj = CrmFindObject(xpathselectall);
		if (obj)
		{
			obj.DoClick();
			Global.DoSleep(1000);
		}
		

					{
						ux_ClickButton('Delete')
					}
					
					var xpathOK = "//span[contains(@id, 'confirmButton')]";
					var obj = CrmFindObject(xpathOK);
					if (obj)
					{
						obj.DoClick();
					}
					
		
		else
		{
			LogAssert("Grid element not found", false);
		}

}

function ux_OLDGridDeleteAll2 ()
{
	var xpathselectall = "//button[@title='Select All']";
	var obj = CrmFindObject(xpathselectall);
		if (obj)
		{
			obj.DoClick();
			Global.DoSleep(1000);
		}
		

					{
						ux_ClickButton('Delete')
					}
					
					var xpathOK = "//span[contains(@id, 'confirmButton')]";
					var obj = CrmFindObject(xpathOK);
					if (obj)
					{
						obj.DoClick();
					}
					
		
		else
		{
			LogAssert("Grid element not found", false);
		}

}

function ux_OLDGridDeleteAll ()
{
	var xpathselectall = "//button[@title='Select All']";
	var obj = CrmFindObject(xpathselectall);
		if (obj)
		{
			obj.DoClick();
			Global.DoSleep(1000);
		}
		
				var xpathdelete = "//span[@aria-label='Delete']";
				var obj = CrmFindObject(xpathdelete);
					if (obj)
					{
						obj.DoClick();
						Global.DoSleep(1000);
					}
					
					var xpathOK = "//span[@id='confirmButtonText']";
					var obj = CrmFindObject(xpathOK);
					if (obj)
					{
						obj.DoClick();
					}
					
		
		else
		{
			LogAssert("Grid element not found", false);
		}

}

function ux_DeleteButton()
{
	var xpathselectall = "//span[contains(@id, 'confirmButton')]";
	var obj = CrmFindObject(xpathselectall);
		if (obj)
		{
			obj.DoClick();
			Global.DoSleep(1000);
		}
	
					
		
		else
		{
			LogAssert("Grid element not found", false);
		}

}


function ux_GridSelectAll()
{
	var xpathselectall = "//button[@title='Select All']";
	var obj = CrmFindObject(xpathselectall);
		if (obj)
		{
			obj.DoClick();
			Global.DoSleep(1000);
		}
		
		else
		{
			LogAssert("Select All not found", false);
		}
}		
	

function ux_ClickMoreTab()
{
	var xpath = "//span[contains(@id, 'icon_more_tab_')]";
	var obj = CrmFindObject(xpath);
	
	var xpath2 = "//li[contains(@id, 'related_tab')]";
	var obj2 = CrmFindObject(xpath2);
	
	if (obj)
    {
        obj.DoClick();
    } 	
       
    else
    
		if (obj2)
		{
        obj2.DoClick();
        }
        else
        
        {
        Tester.Assert("Related or More tab not found", false);
        }
    }

function ux_MoreOptions(/**string*/ entity)

{
	var xpath = "//div[contains(@data-id, '" + entity + "')]";
	var obj = CrmFindObject(xpath);
		if (obj)
		{
			obj.DoClick();
			Global.DoSleep(1000);
		}
		
		else
		{
			LogAssert("Entity not found", false);
		}
}		

function ux_OpenRelatedEntity(/**string*/ entity)

{
	ux_ClickMoreTab()
	Global.DoSleep(1000);
	ux_MoreOptions(entity)
}



function ux_CheckInventory (/**string*/ Quantity)
{	
	var xpath = "//span[normalize-space(.)='Inventory Available: " + Quantity + "']"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj._DoEnsureVisible();
        Tester.Assert("Available Quantity is correct: " +Quantity, true);
    }
    
    else
    {
    Tester.Assert("Available Quantity is incorrect: " +Quantity, false);
    }
}

function ux_SetAppParameter(/**string*/ param, /**string*/ value)
{

var modulestart = param
var xpathparam = "//div[@title='" + param + "']"
var objparam = CrmFindObject(xpathparam);

	if (objparam)
	{
		objparam._object_name = param;
		objparam._DoEnsureVisible();
		objparam.DoDblClick();
		objparam.DoDblClick();
		Global.DoSleep(3000);
		}
ParameterValue(value)
}

function uxOLD_SetAppParameter(/**string*/ param, /**string*/ value)
{

var modulestart = param
var xpathparam = "//label[contains(., '" + param + "')]"
var objparam = CrmFindObject(xpathparam);

	if (objparam)
	{
		objparam._object_name = param;
		objparam._DoEnsureVisible();
		objparam.DoLDClick(15, 30);
		Global.DoSleep(3000);
		}
ParameterValue(value)
}

function ParameterValue(/**string*/ value)
{

var modulestart = value
var xpathvalue = "//input[contains(@id, 'configvalue')]"
var objvalue = CrmFindObject(xpathvalue);

if (objvalue) {
	
	objvalue._object_name = value;
	objvalue.DoClick();	
	objvalue.DoSetText(value);
	Global.DoSleep(2000);
	}
var SaveAndClose = "(//span[contains(., 'Save & Close')])[1]"
var SaveXpath = CrmFindObject(SaveAndClose);
SaveXpath.DoClick();
}

function ux_QtyBackorder(/**string*/ ExpectedValue)
{
var xpath = "//img[contains(@src, 'backorder.svg')]";
var obj = CrmFindObject(xpath);

var ActualValue = obj.GetTitle();

	Tester.Message('Checking Qty Backordered');
	
    if("Quantity Back Ordered = " + ExpectedValue == ActualValue )
    {
   		Tester.Message('Value is correct: '+ActualValue);
    }
    else
    {
        Tester.Message('Expected Value: '+ExpectedValue);
        LogAssert('Value is incorrect: '+ActualValue, false);
    }
}

function ux_AvailableInventory(/**string*/ ExpectedValue)
{
var xpath = "//span[@id='dialogMessageText']"
var obj = CrmFindObject(xpath);

var ActualValue = obj.GetText();

var OKxpath = "//button[@id='okButton']"
var OKobj = CrmFindObject(OKxpath);

	Tester.Message('Checking Available Inventory');
	
    if("Inventory Available: " +ExpectedValue == ActualValue)
    {
   		Tester.Message('Value is correct: '+ActualValue);
   		OKobj.DoClick();
    }
    else
    {
        Tester.Message('Expected Value: '+ExpectedValue);
        LogAssert('Value is incorrect: '+ActualValue, false);
        OKobj.DoClick();
    }
}


function ux_RunEasyPrint(/**string*/ name)
{
	ux_ClickButton("Easy Print")
	Global.DoSleep(1000);
	ux_SearchIcon()
	var xpath = "//iframe[@id='lookupDialog-wrapper-iFrame']@@@//td[contains(@title,'" + name +"')]/..//input[@name='btSelectItem']"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj._DoEnsureVisible();
        obj.DoClick();
        SeS('EasyPrint_ADD').DoClick();
		SeS('EasyPrint_OK').DoClick();
		SeS('EasyPrint_OK2').DoClick();
    }
    
    else
    {
    SeS('EasyPrint_CANCEL').DoClick();
    SeS('EasyPrint_CLOSE').DoClick();
    Tester.Assert("Record not found", false);
    }
 }
 
 function ux_SearchIcon()
 {
	var xpath = "//iframe[@id='easyprint-wrapper-iFrame']@@@//span[@type='button']"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj.DoClick();
    }
    
    else
    {
    Tester.Assert("Icon not found", false);
    }
 }
 
 function ux_SortColumn(/**string*/ column, /**string*/ sort)
 {
	var xpath = "//div[@role='columnheader' and contains(@title,'" + column +"')]"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj.DoClick();
        Global.DoSleep(1000);
        SelectSort(sort)
     } 	
       
    else
    {
    Tester.Assert("Column header not found", false);
    }
 }
 
 function SelectSort(/**string*/ sort)
  {
	var xpath = "//button[@name='" + sort +"']/div/span"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj.DoClick();
     } 	
       
    else
    {
    Tester.Assert("Column sort not found", false);
    }
 }
 
 
 function ux_DialogEditDate (/**string*/ value)
{
	var xpath = "//iframe[contains(@id, '-iFrame')]@@@//input[@id='txtDate']"
	var obj = CrmFindObject(xpath);
	
	if (obj)
	{
		obj.DoClick();
		obj.DoSetText(value)
		obj._DoSendKeys("{TAB}");
	}
	else
	{
		LogAssert("Date field is not found.", false);
	}
}


//select a lookup field in a dialog or custom view to open the lookup view

function ux_OLDDialogSelectLookup(/**string*/ Lookup)
{
	var xpath = "//iframe[@class='UXDialog-iframe']@@@//span[@type='button' and contains(@related, '"+ Lookup +"')]"
	var obj = CrmFindObject(xpath);
	
	var xpath2 = "//iframe[@id='FullPageWebResource']@@@//span[@lookup-type='batch' and contains(@related, '"+ Lookup +"')]"
	var obj2 = CrmFindObject(xpath2);
	
	var xpath3 = "//iframe[@id='yllmssj-iFrame']@@@/html/body/div[1]/form[@id='frm']/div[@id='form']/div[contains(@id, '"+ Lookup +"')]/div/div/span/span"
	var obj3 = CrmFindObject(xpath3);
	
	if (obj)
    {
        obj._DoClick();
    } 	
    
    else
    {
		if (obj2)
		{
        obj2._DoClick();
        }
        else
        
        if (obj3)
		{
        obj3._DoClick();
        }
        
        else
        {
        Tester.Assert("Lookup not found", false);
        }
    }
}

function ux_DialogSelectLookup(/**string*/ Lookup)
{
	var xpath = "//iframe[contains(@id, '-iFrame')]@@@//span[@lookup-type='batch' and contains(@related, '"+ Lookup +"')]"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj._DoClick();
    } 	
    
    else
    {
        Tester.Assert("Lookup not found", false);
    }
}

//search in a dialog's lookup view and select to add value

function ux_DialogSearchRecords(/**string*/ search)
{
	var xpath = '//iframe[contains(@class,"UX") and contains(@id,"Dialog")]@@@//input[@id="txtSearchString"]'
	var obj = CrmFindObject(xpath);
	
	var xpath2 = '//iframe[contains(@class,"UX") and contains(@id,"Dialog")]@@@//span[@id="btnSearch"]'
	var obj2 = CrmFindObject(xpath2);
	
	var xpath3 = '//iframe[@id="lookupDialog-wrapper-iFrame"]@@@//input[@name="btSelectItem" and @data-index="0"]'
	var obj3 = CrmFindObject(xpath3);
	
	if (obj)
    {
        obj._DoEnsureVisible();
        obj.DoSetText(search);
        obj2._DoClick();
        obj3._DoClick();
        ux_DialogAdd()
    } 	
       
    else
    {
    Tester.Assert("Search object not found", false);
    }
}

//Click ADD or OK button in a lookup view opened in a dialog


function ux_DialogAdd()
{
	var xpath = "//button[@id='btnAddLookup']"
	var obj = CrmFindObject(xpath);
	
	var xpath2 = '//button[@id="btnSearch"]'
	var obj2 = CrmFindObject(xpath2);
	
	var xpath3 = '//button[@id="btnOk"]'
	var obj3 = CrmFindObject(xpath3);

	
	if (obj)
    {
        obj.DoClick();
    } 	
       
    else
    {
		if (obj2)
		{
		obj2._DoEnsureVisible();
        obj2.DoClick();
        }
        else
        
       if (obj3)
       {
        obj3._DoEnsureVisible();
        obj3.DoClick();
       }
        else

        {
        Tester.Assert("Add button not found", false);
        }
    }

}

//Click OK button in a lookup view opened in a dialog
    
function ux_ButtonOK()
	{
	var xpath = "//button[@id='btnConfirmation']"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj.DoClick();
    } 	
       
        else

        {
        Tester.Assert("OK button not found", false);
        }
    }
    
function ux_ButtonConfirm()
	{
	var xpath = '//button[@id="btnOk"]'
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj.DoClick();
    } 	
       
        else

        {
        Tester.Assert("OK button not found", false);
        }
    }

//Used in dialogs or custom views.
//1. Selects a lookup field
//2. Searches for a record in the lookup view and selects to add record

function UX_DialogSetLookupValue(/**string*/ Lookup, /**string*/ search)

{
ux_DialogSelectLookup(Lookup)
ux_DialogSearchRecords(search)
}

function ux_DialogConfirm()
{
	var xpath = "//button[@id='btnRun']"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj.DoClick();
     } 	
       
    else
    {
    Tester.Assert("Button not found", false);
    }
}


function ux_SortColumn(/**string*/ column, /**string*/ sort)
 {
	var xpath = "//div[@role='columnheader' and contains(@title,'" + column +"')]"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj.DoClick();
        Global.DoSleep(1000);
        SelectSort(sort)
     } 	
       
    else
    {
    Tester.Assert("Column header not found", false);
    }
 }


function SelectSort(/**string*/ sort)
  {
	var xpath = "//button[@name='" + sort +"']/div/span"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj.DoClick();
     } 	
       
    else
    {
    Tester.Assert("Column sort not found", false);
    }
 }



function ux_AddSession(/**string*/ session)
{
	var xpath = "//iframe[@id='FullPageWebResource']@@@//td[@title='" + session + "']/..//input[@name='btSelectItem']"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj.DoClick();
     } 	
       
    else
    {
    Tester.Assert("Session not found", false);
    }
}



function ux_OLDAddSession(/**string*/ session)
{
	var xpath = "//iframe[@id='addsessions-wrapper-iFrame']@@@//td[@title='" + session + "']/..//input[@name='btSelectItem']"
	var obj = CrmFindObject(xpath);
	
	if (obj)
    {
        obj.DoClick();
     } 	
       
    else
    {
    Tester.Assert("Session not found", false);
    }
}


function ux_WaitForButton(/**string*/ name)

{
    var xpath = "//button[@aria-label='" + name + "']";
	var obj = CrmFindObject(xpath);
	obj._DoEnsureVisible();
}

function GetDatasheetVal(/**string*/ filename, /**string*/ sheetName, /**string*/ testName, /**string*/ columnName)
               //function to get external datasheet value
               //first column datasheet must be test names
               //column headers are desired saved values for test rows
               //input file, sheet, test name and desired column
               //return data value in cell (test name, column name)
{
               //Open the spreadsheet
               var success = Spreadsheet.DoAttach(filename, sheetName);
               Tester.Assert('Open Spreadsheet', success);

               //Now loop through and see if we can find that value
               var rowCount = Spreadsheet.GetRowCount();
               Spreadsheet.SetRange(1, rowCount + 1);

               //Loop through all the rows and find the match for testName (column0)
               while (Spreadsheet.DoSequential()) 
               {
                              if (Spreadsheet.GetCell(0) == testName)  //save headers and data
                              {
                                             for (var i = 0; i < Spreadsheet.GetColumnCount(); i++)
                                             {
                                                            if (Spreadsheet.GetCell(i,0) == columnName)
                                                            {
                                                                           return Spreadsheet.GetCell(i);
                                                            }
                                             }
                              }
               }
}



/**
 * Selects value from a lookup field.
 * @param field Repository ID of a lookup object.
 * @param value Value to select.
 */
function ux_LookupField(/**objectId*/ field, /**string*/ value) 
{
	var obj = SeS(field);
	if (obj)
	{
		obj._DoSetText(value);
		Global.DoSleep(2000);
		var xpath = "//ul[@aria-label='Lookup results']//span[contains(text(),\"" + value + "\")]";
		var item = CrmFindObject(xpath);
		
		if (!item)
		{
			LogAssert("CrmLookupField: item is not found: " + value, false);
		}
		
		item.object_name = value;
		item.DoClick();
		
	}
	else
	{
		LogAssert("CrmLookupField: field is not found: " + field, false);
	}
}

function ux_OLDClearLookup(/**objectId*/ field, /**string*/ value) 
{
	var obj = SeS(field);
	if (obj)
	{
		obj._DoSelect();
		Global.DoSendKeys('BS');
		
	}
	else
	{
		LogAssert("CrmLookupField: field is not found: " + field, false);
	}
}


/**
 * Clears value from a lookup field.
 * @param field Repository ID of a lookup object label.
 */
function ux_ClearLookupField(/**objectId*/ field) 
{
	var obj = SeS(field);
	if (obj)
	{
		var container = obj._DoDOMFindParentWithAttribute('data-id', 'regex:.*');
		if (container)
		{
			var value = container._DoDOMQueryXPath('.//li');
			if (value && value.length)
			{
				value[0]._DoMouseMove();
				Global.DoSleep(100);
				var buttons = container._DoDOMQueryXPath('.//button');
				if (buttons && buttons.length)
				{
					buttons[0].DoClick();
				}
			}
		}
	}
	else
	{
		LogAssert("CrmClearField: field is not found: " + field, false);
	}
}

function ConfigureGridType()
{
	if (typeof(g_wave2) == "undefined")
	{
		g_wave2 = false;
	}
	var _gridType = g_wave2 ? "DomDynamicsCrmAgGrid" : "DomDynamicsCrmUnifiedInterfaceGrid";

	for(var objId in saved_script_objects)
	{
		var obj = saved_script_objects[objId];
		if (obj.object_type == "DomDynamicsCrmAgGrid" || obj.object_type == "DomDynamicsCrmUnifiedInterfaceGrid")
		{
			obj.object_type = _gridType;
		}
	}
}



function GetTestName()
{
    return Tester._testState._testName;
}


function GetDatasheetVal(/**string*/ filename, /**string*/ sheetName, /**string*/ testName, /**string*/ columnName)
	//function to get external datasheet value
	//first column datasheet must be test names
	//column headers are desired saved values for test rows
	//input file, sheet, test name and desired column
	//return data value in cell (test name, column name)
	//AR
{
	//Open the spreadsheet
	var success = Spreadsheet.DoAttach(filename, sheetName);

	//Now loop through and see if we can find that value
	var rowCount = Spreadsheet.GetRowCount();
	Spreadsheet.SetRange(1, rowCount + 1);

	//Loop through all the rows and find the match for testName (column0)
	while (Spreadsheet.DoSequential()) 
	{
		if (Spreadsheet.GetCell(0) == testName)  //save headers and data
		{
			for (var i = 0; i < Spreadsheet.GetColumnCount(); i++)
			{
				if (Spreadsheet.GetCell(i,0) == columnName)
				{
					return Spreadsheet.GetCell(i);
				}
			}
		}
	}
}

function GetDatasheetTestRow(/**string*/ filename, /**string*/ sheetName, /**string*/ testName)
	//function to get external datasheet row index
	//first column datasheet must be test names
	//where testName matches, get row index
	//input file, sheet, and test name
	//return row index
	//AR
{
	//Open the spreadsheet
	var success = Spreadsheet.DoAttach(filename, sheetName);

	//Now loop through and see if we can find that value
	var rowCount = Spreadsheet.GetRowCount();
	Spreadsheet.SetRange(1, rowCount + 1);

	//Loop through all the rows and find the match for testName (column0)
	while (Spreadsheet.DoSequential()) 
	{
		if (Spreadsheet.GetCell(0) == testName)  //save headers and data
		{
			return Spreadsheet.GetCurrentRowIndex();
		}
	}

}

function OLDGetColumnStartEnd(/**string*/ filename, /**string*/ sheetName, /**string*/ columnPrefix)
	//function to get starting and ending column indexes
	//with the input columnPrefix string
	//then set global ColStart/ColEnd variables with indexes
	//AR
	//Use this function when getting a column start/end when there are other prefixes in the same sheet.
{
	//Open the spreadsheet
	var success = Spreadsheet.DoAttach(filename, sheetName);

	//Loop through all the columns and find the match with prefix
	var found = false;
	var colName = "";
	var searchPattern = new RegExp('^' + columnPrefix);  //regEx startsWith check
	
	for (var i = 0; i < Spreadsheet.GetColumnCount(); i++)
	{
		colName = Spreadsheet.GetCell(i,0);
		
		if (searchPattern.test(colName) && !found)
		{
			ColStart = i;
			found = true;
		}
		if (!searchPattern.test(colName) && found)
		{
			ColEnd = i - 1;
			break;
		}
	}
}

function GetColumnStartEnd(/**string*/ filename, /**string*/ sheetName, /**string*/ columnPrefix)
	//function to get starting and ending column indexes
	//with the input columnPrefix string
	//then set global ColStart/ColEnd variables with indexes
	//AR
{
	//Open the spreadsheet
	var success = Spreadsheet.DoAttach(filename, sheetName);

	//Loop through all the columns and find the match with prefix
	var found = false;
	var colName = "";
	var searchPattern = new RegExp('^' + columnPrefix);  //regEx startsWith check
	ColStart = -1;
	ColEnd = -1;
	
	for (var i = 0; i < Spreadsheet.GetColumnCount(); i++)
	{
		colName = Spreadsheet.GetCell(i,0);

		if (searchPattern.test(colName) && !found)
		{
			ColStart = i;
			found = true;
		}
		if (!searchPattern.test(colName) && found)
		{
			ColEnd = i - 1;
			break;
		}
	}
	if (found && ColEnd == -1){ColEnd = Spreadsheet.GetColumnCount() - 1;}
}


function OLDVerifyPair(/**string*/ VerifyValue, /**string*/ ObjectName)
	//
	//AR
{
		//Tester.Assert("Verify that: " + ObjectName + " = " + VerifyValue, SeS(ObjectName).GetValue() == VerifyValue);
	
	var objVal = SeS(ObjectName).GetValue();

	if (objVal.length == 0)
	{
		objVal = SeS(ObjectName).GetText();
		if (objVal.length == 0)
		{
			objVal = SeS(ObjectName).GetInnerText();
			if (objVal.length == 0)
			{
				Tester.Assert("Verify that: " + ObjectName + " = " + VerifyValue, false, "", {comment: "No value found"});
				return;
			}
		}
	}
	if (VerifyValue == objVal)
	{
		Tester.Assert("Verify that: " + ObjectName + " = " + VerifyValue, true);
	}
	else
	{
		Tester.Assert("Verify that: " + ObjectName + " = " + VerifyValue, false, "", {comment: "Actual value = " + objVal});
	}

}

function PrepTestName(name)
	//MAB
	//08.06.2021
	//pre-pends the string 'Cart' to the current Test Name (Prior to submission of the item to the Shopping cart).  
	//For example Current Test name = ' MeetingRegistration2",  After running the function the Cart test name will be "CartMeetingRegistration2"
{
	var endname
	Tester.Message("FUNCTION Start Test Name = " +name);
	endname = 'Cart' + name;
	Tester.Message("FUNCTION End Test Name = " +endname);
	return endname;
}

function LtrimShoppingCart(/**string*/ startordernumber)
	//Removes the string 'Order ' from the beginning of the captured value for Shopping Cart Order Number
	//MAB
	//08.17.2021
{
	var pretrimvalue = startordernumber
	
	//Tester.Message("The PREtrim value of the Order Numeber is " +pretrimvalue)
	
	var posttrimvalue = pretrimvalue.substring(6,23);
	//Tester.Message("The POSTtrim value of the Order Numeber is " +posttrimvalue)
	
	return posttrimvalue;
}




//***********************************************************************************************************************************
//DATE FUNCTIONS TABLE OF CONTENTS
	//1.  d_ForceTenCharacterDate(inputdate) - returns 'inputenddate'.
	//2.  d_IdentifyMonth(date) - returns 'month'.
	//3.  d_TodaysDate(/**string*/ startdate) - returns 'inputenddate'.
	//4.  d_FirstCycleStartDate(/**string*/ startdate) - returns 'firstcyclestartdate'.
	//5.  d_FirstCycleEndDate(enddate) - returns 'firstcycleenddate'.
	//6.  d_ThisYear(date)
	//7.  d_Next Year(Date)
	//8.  d_LastDayOfMonth


//1.  d_ForceTenCharacterDate(inputdate) - returns 'inputenddate'.
function d_ForceTenCharacterDate(inputdate)
	{
	//Tester.Message("*****START FUNCTION.....'d_Force10CharacterDate(inputdate)'");
	//Tester.Message("'return variable = inputenddate'.  This function returns a Short date in the format 'MM/dd/yyyy'");
	// High Level Summary:
		//This function accepts an Input Date (from CRM or MX)   
		//If the length of the input date <> 10, It manipulates the input date by forcing the length to 10 using the format "MM/dd/yyyy" 
		//This ensures that the input date can accurately be compared to an assertion date (in RVL or pulled from an Excel Sheet).
	
	//Date and Status variables
	var inputdate
	var inputstartdate
	var leninputstartdate
	//var inputenddate
	//var comparisondate
	var fixstatus
	//var blncomparisonpassed
	//var blncomparedatelengthpassed
	
	//Parsed and Padded variables
	var day
	var paddedday
	var month
	var paddedmonth
	var monthandyear
	var year
	var slashposition
	
	
	
	
	//Get inputdate and determine length
	inputstartdate = inputdate;
	//Tester.Message("The Input Date for this function is: " +inputstartdate);
	
	leninputstartdate = inputstartdate.length
	//Tester.Message("The length of the INPUT Date = " +leninputstartdate);
	
	
	//Based on the length of the input date and the position of slash (separators) in the MM/dd/yyyy format,
	//determine if month, day, or both month and day need to be padded with a zero using one of the following paths.
	
		//If:
			//Path 1: No change required. Input Date Length = 10. Date is formatted correctly.
			//Path 2:  Input Date Length = 9. Either the Month is too short or the Day is too short.  Locate the position of the first slash:
				//Path 2a: FIX MONTH. If position of first slash = 2, then the month is too short.  Need to Pad Month with 0.
				//Path 2b:  FIX DAY. If the position of the first slash <> 2 then the day is too short.  Need to Pad Day with 0.
			//Path 3: FIX BOTH. Input Date Length = 8, Both the Month AND The Day need to be padded with a 0.
	
	
	//Path 1:  No Change Required
	if(leninputstartdate == 10)
	{
		fixstatus = "OK";
		//Tester.Message(fixstatus +  ".  The Current Date needs no adjustment " +inputstartdate);
		
		inputenddate = inputstartdate;
		//Tester.Message("Input End Date = " +inputenddate);
		//Tester.Message("*****End 'd_ForceTenCharacterDate' function");
		//Tester.Message("The NO Change Input End Date is " + inputenddate);
		//Tester.Message("");
		return inputenddate
	}
		else
	{
	}
	
	
	//Path 2a: FIX MONTH
	if (fixstatus !== "OK" && leninputstartdate == 9 && inputstartdate.substring(1,2) == "/")
	{
		//Tester.Message("FIX MONTH");
		slashposition = inputstartdate.substring (1,2)
		//Tester.Message("The " +slashposition+ " is in the 2nd character, but needs to be in the 3rd character.");
		
		
		//fixstatus = "Fix month using left pad of 0.";
		//Tester.Message("Fix Status = " +fixstatus);
			
		day = inputstartdate.substring(0,1);
		//Tester.Message("The value for Day = " +day)
		
		paddedday = 0 +day
		
		monthandyear = inputstartdate.substring(1,9);
		//Tester.Message("The value for Month and Year = " +monthandyear)
		
		//Tester.Message("Original date was only " +leninputstartdate+ " characters  Long.   It will be fixed by adding a 0 to the beginning of the date string.");
		
		inputenddate = paddedday +monthandyear
		//Tester.Message("The Date has been changed to " +inputenddate);
		
		//Tester.Message("Input End Date = " +inputenddate)
		//Tester.Message("*****End 'd_ForceTenCharacterDate' function");
		//Tester.Message("The Fix Month Input End Date is " + inputenddate);
		//Tester.Message("");
		return inputenddate
	}
		else
	{       
	}
	
	
	//Path 2b: FIX DAY
	if (fixstatus !== "OK" && leninputstartdate == 9 && inputstartdate.substring(1,2) != "/")
	{
		//Tester.Message("FIX DAY");
		slashposition = inputstartdate.substring (2,3)
		//Tester.Message("The " +slashposition+ " is in the 4th character, but needs to be in the 5th character.");
		
		
		//fixstatus = "Fix Day using left pad of 0.";
		//Tester.Message("Fix Status = " +fixstatus);
			
		month = inputstartdate.substring(0,2);
		//Tester.Message("The value for Month = " +month)
		
		day = inputstartdate.substring(3,4);
		//Tester.Message("The value for Day = " +day)
		
		paddedday = 0 +day
		
		year = inputstartdate.substring(5,9);
		//Tester.Message("The value for Year = " +year)
		
		//Tester.Message("The Original date was only " +leninputstartdate+ " characters  Long.   It will be fixed by adding a 0 to the beginning of the day.");
		
		inputenddate = month + "/" +paddedday + "/" +year
		//Tester.Message("The Date has been changed to " +inputenddate);
		
		//Tester.Message("The input End Date = " +inputenddate)
		//Tester.Message("*****End 'd_ForceTenCharacterDate' function");
		//Tester.Message("The Fix Day Input End Date is " + inputenddate);
		//Tester.Message("");
		return inputenddate
	}
		else
	{       
		
	}
	
	
	//Path 3: FIX BOTH
	if (fixstatus !== "OK" && leninputstartdate == 8)
	{
		//Tester.Message("FIX BOTH (Day and Month)");	
		
		//fixstatus = "Pad Month AND Day with 0.";
		//Tester.Message("Fix Status = " +fixstatus);
		
		
		month = inputstartdate.substring(0,1);
		//Tester.Message("The value for Month = " +month)
		
		day = inputstartdate.substring(2,3);
		//Tester.Message("The value for Day = " +day)
		
		paddedday = 0 +day
		paddedmonth = 0 +month
		
		year = inputstartdate.substring(4,8);
		//Tester.Message("The value for Year = " +year)
		
		//Tester.Message("The Original date was only " +leninputstartdate+ " characters  Long.   It will be fixed by adding a 0 to the beginning of the Month AND Day.");
		
		inputenddate = paddedmonth + "/" +paddedday + "/" +year
		//Tester.Message("The Date has been changed to " +inputenddate);
		
		//Tester.Message("The input End Date = " +inputenddate)
		//Tester.Message("*****End 'd_ForceTenCharacterDate' function");
		//Tester.Message("The Fix Both Input End Date is " + inputenddate);
		//Tester.Message("");
		
		return inputenddate
	}
			else
	{       
		
	}

	
	
	
	
		//Path 4: Allow NULL
	if (fixstatus !== "OK" && leninputstartdate == 0)
	{
		//Tester.Message("The Length of the Date field is 0.  That means its' NULL in CRM.)");	
		
		fixstatus = "Make NULL.";
		//Tester.Message("Fix Status = " +fixstatus);
		
		
		//month = inputstartdate.substring(0,1);
		//Tester.Message("The value for Month = " +month)
		
		//day = inputstartdate.substring(2,3);
		//Tester.Message("The value for Day = " +day)
		
		//paddedday = 0 +day
		//paddedmonth = 0 +month
		
		//year = inputstartdate.substring(4,8);
		//Tester.Message("The value for Year = " +year)
		
		//Tester.Message("The Original date was only " +leninputstartdate+ " characters  Long.   It will be fixed by adding a 0 to the beginning of the Month AND Day.");
		
		inputenddate = ""
		//Tester.Message("The Date has been changed to " +inputenddate);
		
		//Tester.Message("The input End Date = " +inputenddate)
		//Tester.Message("*****End 'd_ForceTenCharacterDate' function");
		//Tester.Message("The Fix Both Input End Date is " + inputenddate);
		//Tester.Message("");
		
		return inputenddate
	}
			else
	{       
		
	}
	
	
	}



//2.  d_IdentifyMonth(date) - returns 'month'.
function d_IdentifyMonth(date)
		{
		//Tester.Message("*****START FUNCTION.....'d_IdentifyMonth(date)'");
		//Tester.Message("Return variable = 'month'.  This function returns the Month of the input date After modification (if needed)");
		
		var inputdate
		var inputenddate
		var monthname
		var month
		var monthnumber
		var proratenumberofmonths
		var lastdayofmonth
		var day
		var year
		var nextyear
		
			
		inputdate = date;
		//Tester.Message("Input Date = " +inputdate);
		
		if (inputdate.length < 10)
		{
			//Tester.Message("Input Date < 10 characters.  We'll need to call the 'd_ForceTenCharacterDate' function");
			//Tester.Message("*Exit the 'd_IdentifyMonth' function");
			//Tester.Message("");
			var inputenddate = d_ForceTenCharacterDate(inputdate);
						
			
			//Tester.Message("Input End Date = " +inputenddate);
				
			month = inputenddate.substring(0,2);
			//Tester.Message("The value for Month = " +month);
			
		}
		else
		{
			//Tester.Message("Input Date = 10 characters, lets get the month now");
			//Tester.Message("");
			inputenddate = inputdate
			
			month = inputenddate.substring(0,2);
			//Tester.Message("The numeric value for Month = " +month);
			
			return month
		}
		
		
		
		switch (month) 
		{
			case "01":
				monthname = "January";
				monthmnumber = "01";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				Tester.Message("");
				return month;
				break;
		
		
			case "02":
				//Tester.Message("*****RETURN to 'IdentifyMonth' function");
				monthname = "February";
				monthnumber = "02";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				Tester.Message("");
				return month;
				break;
			
			
			case "03":
				monthmnumber = "03";
				monthname = "March";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				Tester.Message("");
				return month;
				break;
				    	
			case "04":
				monthnumber = "04";
				monthname = "April";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				Tester.Message("");
				return month;
				break;
		    	
			case "05":
				monthmnumber = "05";
				monthname = "May";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				Tester.Message("");
				return month;
				break;
				
			case "06":
				monthmnumber = "06";
				monthname = "June";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				Tester.Message("");
				return month;
				break;
				
			case "07":
				monthmnumber = "07";
				monthname = "July";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				Tester.Message("");
				return month;
				break;
					
			case "08":
				monthmnumber = "08";
				monthname = "August";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				Tester.Message("");
				return month;
				break;
				
			case "09":
				monthmnumber = "09";
				monthname = "September";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				Tester.Message("");
				return month;
				break;
				
			case "10":
				monthmnumber = "10";
				monthname = "October";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				Tester.Message("");
				return month;
				break;
				
			case "11":
				monthmnumber = "11";
				monthname = "November";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				//Tester.Message("");
				return month;
				break;
				
			case "12":
				monthmnumber = "12";
				monthname = "December";
				//Tester.Message("*RETURN to the 'd_IdentifyMonth' function");
				Tester.Message("Month Name = " +monthname);
				Tester.Message("Numeric value for Month = " +month);
				//Tester.Message("Function 'Return variable' = month: " +month);
				//Tester.Message("*****End the 'd_IdentifyMonth' function");
				Tester.Message("");
				return month;
				break;
			}
		
	}




//3.  d_TodaysDate(/**string*/ startdate) - returns 'inputenddate'.
function d_TodaysDate(/**string*/ startdate)
	{
	//Date (LOOONG Date)
	//Tester.Message("*****START FUNCTION.....d_Today'sDate(startdate)'");
	//Tester.Message("'return variable = inputenddate'")
	//Tester.Message("This function returns todays date as a 10 Character short date - 'inputenddate'");
	var startdate = new Date();
	//Tester.Message("Today's LONG Date = " +startdate);
	
	//Extract Date pieces (Month, Day, Year
	var dd = String(startdate.getDate());
	//Tester.Message("Today's day = " +dd)
	var mm = String(startdate.getMonth() + 1);
	//Tester.Message("Today's Month = " +mm);
	
	var yyyy = startdate.getFullYear();
	//Tester.Message("Todays' Year = " +yyyy);
	
	//Recalculate Date as Short Date
	startdate = mm + "/" + dd + "/" + yyyy;
	//Tester.Message("Today's Short date = " +startdate);
	//Tester.Message("");
	
	if (startdate.length == 10)
		{
		//Tester.Message("Start Date Length is good.  Return Start Date as is");
		inputenddate = startdate
		//Tester.Message("*****End 'd_TodaysDate' function");
		//Tester.Message("");
		return inputenddate;
		}
	else
		{
		var modifiedstartdate = "Call the force 10 character Date function"
		//Tester.Message(modifiedstartdate);
		
		var inputenddate = d_ForceTenCharacterDate(startdate)
		//Tester.Message("Return to the 'd_Today'sDate' function")
		//Tester.Message("Input End Date in THIS function = " +inputenddate);
		//Tester.Message("*****End 'd_TodaysDate' function");
		//Tester.Message("");
		return inputenddate;
		
		}
	}




//4.  Declare First Cycle Start Date as a firstcyclestartdateConstant
function d_FirstCycleStartDate(/**string*/ startdate)
	//Declare First  Cycle Start Date as a Constant
	{
	//Tester.Message("*****START FUNCTION.....'d_FirstCycleStartDate(/**string*/ startdate'");
	//Tester.Message("Return variable = 'firstcyclestartdate'.  This function returns the correct Cycle start Date based on current Month");
	
	//Date (LOOONG Date)
	var startdate = new Date();
	//Tester.Message("Today's Date = " +startdate);
	
	//Extract Date pieces (Month, Day, Year
	var dd = String(startdate.getDate());
	var mm = String(startdate.getMonth() + 1);
	var yyyy = String(startdate.getFullYear());
	var yyyy2 = String(startdate.getFullYear() + 1);
	
	//Tester.Message("The Day is " +dd)
	//Tester.Message("The Month is " +mm)
	//Tester.Message("This year is " +yyyy)
	//Tester.Message("Next year is " +yyyy2)
	
	//Recalculate Date as Short Date.  Force to 10 characters if necessary
	var startdate = mm + "/" + dd + "/" + yyyy;
	//Tester.Message("The Long Date has been converted to = " +startdate);
	//Tester.Message("");
	
	//Tester.Message("*****START FUNCTION.....'d_ForceTenCharacterDate");
	var inputenddate = d_ForceTenCharacterDate(startdate);
	//Tester.Message("*****Return to 'd_FirstCycleStartDate' function");
	
	//Tester.Message("Today's Short Date is " + inputenddate);
	Tester.Message("");
		
	//Identify the Month
	//Tester.Message("*****START FUNCTION.....'d_IdentifyMonth function");
	var month = d_IdentifyMonth(inputenddate)
	//Tester.Message("*Return to 'd_FirstCycleStartDate' function");
	//Tester.Message("Month after submitting to the Identify Month function = " +month);
	
	
	//var monthnumber = months[startdate]
	//Tester.Message("Current Month Number = " + monthnumber)
	
	
	if(month == "December")
	{
	//Tester.Message("The month IS December.  Use NEXT Year");
	var firstcyclestartdate = "01/01/" +yyyy2;
	//Tester.message("The First Cycle Start Date is " +firstcyclestartdate)
	//Tester.Message("*****End 'd_FirstCycleStartDate' function");
	//Tester.Message("");
	return firstcyclestartdate
	
	}
	else
	{
	//Tester.Message("The Month is NOT December. Use THIS Year")
	var firstcyclestartdate = ("01/01/" +yyyy);
	//Tester.Message("The First Cycle Start Date is " +firstcyclestartdate);
	//Tester.Message("*****End 'd_FirstCycleStartDate' function");
	//Tester.Message("");
	
	//var thisyear = d_Thisyear(inputenddate)
	//var cyclestartdate = "01/01/"
	return firstcyclestartdate
	}
}


//5.  Declare First Cycle End Date as a firstcycleenddateConstant
function d_FirstCycleEndDate(enddate)
{
	//Tester.Message("*****START FUNCTION.....'d_FirstCycleEndDate(/**string*/ enddate'");
	//Tester.Message("Return variable = 'firstcycleenddate'.  This function returns the correct Cycle End Date based on current Month");   
	
	//Date (LOOONG Date)
	var enddate = new Date();
	//Tester.Message("Today's Date = " +enddate);
	
	//Extract Date pieces (Month, Day, Year
	var dd = String(enddate.getDate());
	var mm = String(enddate.getMonth() + 1);
	var yyyy = enddate.getFullYear();
	var yyyy2 = String(enddate.getFullYear() + 1);
	
	//Tester.Message("The Day is " +dd)
	//Tester.Message("The Month is " +mm)
	//Tester.Message("This year is " +yyyy)
	//Tester.Message("Next year is " +yyyy2)
	
	
	//Recalculate Date as Short Date.  Force to 10 characters if necessary
	var enddate = mm + "/" + dd + "/" + yyyy;
	//Tester.Message("The Long Date has been converted to = " +enddate);
	//Tester.Message("");
	
	var startdate = enddate
	
	var inputenddate = d_ForceTenCharacterDate(startdate);
	//Tester.Message("Today's Short Date is " + inputenddate);
	
	
	//Identify the Month
	var month = d_IdentifyMonth(inputenddate)
	//Tester.Message("*****Return to 'd_FirstCycleEndDate' function");
	//Tester.Message("Month after submitting to the Identify Month function = " +month);
	
	
	//var monthnumber = months[September - 1]
	//Tester.Message("Current Month Number = " + monthnumber)
	
	
	if(month == "December")
	{
	//Tester.Message("The month IS December.  Use NEXT Year");
	var firstcycleenddate = ("12/31/" +yyyy2);
	//Tester.Message("The First Cycle End Date is " +firstcycleenddate)
	//Tester.Message("*****End 'd_FirstCycleEndDate' function");
	//Tester.Message("");
	
	return firstcycleenddate
	
	}
	else
	{
	//Tester.Message("The Month is NOT December. Use THIS Year")
	var firstcycleenddate = ("12/31/" +yyyy);
	//Tester.Message("The First Cycle End Date is " +firstcycleenddate);
	//Tester.Message("*****End 'd_FirstCycleEndDate' function");
	//Tester.Message("");
	
	return firstcycleenddate
	}
}




//6.  This Year
function d_ThisYear()
{
	//Tester.Message("*****START FUNCTION.....'ThisYear'")
	//Tester.Message("Return variable = 'thisyear'.  This function returns the correct year portion of the current date");
	
	var startdate = new Date();
	//Tester.Message("Today's LONG Date = " +startdate);
	
	//var thismonth = startdate.getMonth()+1
	//Tester.Message("This Month = " +thismonth);
	
	var thisyear = startdate.getFullYear()
	//Tester.Message("The CURRENT year is " +thisyear);
	
	var nextyear = startdate.getFullYear()+1
	//Tester.Message("NEXT year is " +nextyear);
	
	return thisyear;
		
}



//7.  d_Next Year
function d_NextYear()
{
	//Tester.Message("*****START FUNCTION.....'NextYear'")
	//Tester.Message("Return variable = 'Nextyear'.  This function returns the correct year portion of the Next year's Date");
	
	var startdate = new Date();
	//Tester.Message("Today's LONG Date = " +startdate);
	
	//var thismonth = startdate.getMonth()+1
	//Tester.Message("This Month = " +thismonth);
	
	var thisyear = startdate.getFullYear()
	//Tester.Message("The CURRENT year is " +thisyear);
	
	var nextyear = startdate.getFullYear() + 1
	//Tester.Message("NEXT year is " +nextyear);
	
	return nextyear;
		
}



//8.  LastDayOfMonth
function d_LastDayOfMonth(date)
	//Select LastDayOfMonth
	{
	//Tester.Message("*****START FUNCTION.....'d_LastDayOfMonth(date)'");
	//Tester.Message("This function returns the Last Day of the current month");
	//Tester.Message("")
	
	var thismonth
	var lastdayofmonth
	var date = date
	var month
	
	month = d_IdentifyMonth(date)
	//Tester.Message("*Return to the 'd_LastDayOfMonth' function"); 
	thismonth = month
	Tester.Message("This Month is: " +thismonth)
	
	switch (thismonth)
	{
	//If the value returned from the Identify Month function is a two character number, then this section will be used.
		case "01":
		lastdayofmonth = "31";
		Tester.Message("The last day of January is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
	
		case "02":
		lastdayofmonth = "28";
		Tester.Message("The last day of February is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "03":
		lastdayofmonth = "31";
		Tester.Message("The last day of March is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "04":
		lastdayofmonth = "30";
		Tester.Message("The last day of April is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "05":
		lastdayofmonth = "31";
		Tester.Message("The last day of May is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		
		case "06":
		lastdayofmonth = "30";
		Tester.Message("The last day of June is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "07":
		lastdayofmonth = "31";
		Tester.Message("The last day of July is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "08":
		lastdayofmonth = "31";
		Tester.Message("The last day of August is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "09":
		lastdayofmonth = "30";
		Tester.Message("The last day of September is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "10":
		lastdayofmonth = "31";
		Tester.Message("The last day of October is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "11":
		lastdayofmonth = "30";
		Tester.Message("The last day of November is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "12":
		lastdayofmonth = "31";
		Tester.Message("The last day of December is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		
	//If the value returned from the Identify Month function is a month NAME, then this section will be used.
		case "January":
		lastdayofmonth = "31";
		Tester.Message("The last day of January is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
	
		case "February":
		lastdayofmonth = "28";
		Tester.Message("The last day of February is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "March":
		lastdayofmonth = "31";
		Tester.Message("The last day of March is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "April":
		lastdayofmonth = "30";
		Tester.Message("The last day of April is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "May":
		lastdayofmonth = "31";
		Tester.Message("The last day of May is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		
		case "June":
		lastdayofmonth = "30";
		Tester.Message("The last day of June is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "July":
		lastdayofmonth = "31";
		Tester.Message("The last day of July is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "August":
		lastdayofmonth = "31";
		Tester.Message("The last day of August is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "September":
		lastdayofmonth = "30";
		Tester.Message("The last day of September is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "October":
		lastdayofmonth = "31";
		Tester.Message("The last day of October is: " +lastdayofmonth);
		return lastdayofmonth;
		Tester.Message("*****End 'd_LastDayOfMonth' function*****");
		Tester.Message("");
		break;
		
		case "November":
		lastdayofmonth = "30";
		Tester.Message("The last day of November is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
		case "December":
		lastdayofmonth = "31";
		Tester.Message("The last day of December is: " +lastdayofmonth);
		return lastdayofmonth;
		break;
		
	}
}


//6.  Declare First UPCOMING Cycle Start Date as a firstcyclestartdateConstant
function d_FirstUPCOMINGCycleStartDate()
	//Declare First  Cycle Start Date as a Constant
	{
	//Tester.Message("*****START FUNCTION.....'d_FirstCycleStartDate(/**string*/ startdate'");
	//Tester.Message("Return variable = 'firstcyclestartdate'.  This function returns the correct Cycle start Date based on current Month");
	
	//Date (LOOONG Date)
	var startdate = new Date();
	//Tester.Message("Today's Date = " +startdate);
	
	//Extract Date pieces (Month, Day, Year
	var dd = String(startdate.getDate());
	var mm = String(startdate.getMonth() + 1);
	var yyyy = String(startdate.getFullYear());
	var yyyy2 = String(startdate.getFullYear() + 1);
	var yyyy3 = String(startdate.getFullYear() + 2);
	
	Tester.Message("The Day is " +dd);
	Tester.Message("The Month is " +mm);
	Tester.Message("This year is " +yyyy);
	Tester.Message("Next year is " +yyyy2);
	Tester.Message("The year after NEXT is " +yyyy3);
	
	//Recalculate Date as Short Date.  Force to 10 characters if necessary
	var startdate = mm + "/" + dd + "/" + yyyy2;
	//Tester.Message("The Long Date has been converted to = " +startdate);
	//Tester.Message("");
	
	//Tester.Message("*****START FUNCTION.....'d_ForceTenCharacterDate");
	var inputenddate = d_ForceTenCharacterDate(startdate);
	//Tester.Message("*****Return to 'd_FirstCycleStartDate' function");
	
	//Tester.Message("Today's Short Date is " + inputenddate);
	Tester.Message("");
		
	//Identify the Month
	//Tester.Message("*****START FUNCTION.....'d_IdentifyMonth function");
	var month = d_IdentifyMonth(inputenddate)
	//Tester.Message("*Return to 'd_FirstCycleStartDate' function");
	Tester.Message("Month after submitting to the Identify Month function = " +month);
	
	
	//var monthnumber = months[startdate]
	//Tester.Message("Current Month Number = " + monthnumber)
	

	{
	//Tester.Message("The Month is NOT December. Use THIS Year")
	var firstcyclestartdate = ("01/01/" +yyyy2);
	//Tester.Message("The First Cycle Start Date is " +firstcyclestartdate);
	//Tester.Message("*****End 'd_FirstCycleStartDate' function");
	//Tester.Message("");
	
	//var thisyear = d_Thisyear(inputenddate)
	//var cyclestartdate = "01/01/"
	return firstcyclestartdate
	}
}

// Declare First UPCOMING Cycle End Date as a firstcycleenddateConstant
function d_FirstUPCOMINGCycleEndDate(enddate)
{
	//Tester.Message("*****START FUNCTION.....'d_FirstCycleEndDate(/**string*/ enddate'");
	//Tester.Message("Return variable = 'firstcycleenddate'.  This function returns the correct Cycle End Date based on current Month");   
	
	//Date (LOOONG Date)
	var enddate = new Date();
	//Tester.Message("Today's Date = " +enddate);
	
	//Extract Date pieces (Month, Day, Year
	var dd = String(enddate.getDate());
	var mm = String(enddate.getMonth() + 1);
	var yyyy = enddate.getFullYear();
	var yyyy2 = String(enddate.getFullYear() + 1);
	var yyyy3 = String(enddate.getFullYear() + 2);
	
	//Tester.Message("The Day is " +dd)
	//Tester.Message("The Month is " +mm)
	//Tester.Message("This year is " +yyyy)
	//Tester.Message("Next year is " +yyyy2)
	//Tester.Message("The year after NEXT is " +yyyy3);
	
	//Recalculate Date as Short Date.  Force to 10 characters if necessary
	var enddate = mm + "/" + dd + "/" + yyyy;
	//Tester.Message("The Long Date has been converted to = " +enddate);
	//Tester.Message("");
	
	var startdate = enddate
	
	var inputenddate = d_ForceTenCharacterDate(startdate);
	//Tester.Message("Today's Short Date is " + inputenddate);
	
	
	//Identify the Month
	var month = d_IdentifyMonth(inputenddate)
	//Tester.Message("*****Return to 'd_FirstCycleEndDate' function");
	//Tester.Message("Month after submitting to the Identify Month function = " +month);
	
	
	//var monthnumber = months[September - 1]
	//Tester.Message("Current Month Number = " + monthnumber)
	
	
	{
	//Tester.Message("Use NEXT Year for month");
	var firstcycleenddate = ("12/31/" +yyyy2);
	//Tester.Message("The First Cycle End Date is " +firstcycleenddate)
	//Tester.Message("*****End 'd_FirstCycleEndDate' function");
	//Tester.Message("");
	
	return firstcycleenddate
	
	}
	
}

function VerifyPair(/**string*/ VerifyValue, /**string*/ ObjectName)
	//
{
	//Tester.Assert("Verify that: " + ObjectName + " = " + VerifyValue, SeS(ObjectName).GetValue() == VerifyValue);
	
	if (VerifyValue == "<checked>") {VerifyValue = 1}
	if (VerifyValue == "<unchecked>") {VerifyValue = 0}
	
	var objVal = SeS(ObjectName).GetValue();
	
	if (VerifyValue == "null")  //expected null value check
	{
		if (objVal)  //null,undefined,empty,0,false check
		{
			Tester.Assert("Verify that: " + ObjectName + " = " + VerifyValue, false, "", {comment: "Actual value = " + objVal});
			return;
		}
		else
		{
			Tester.Assert("Verify that: " + ObjectName + " = " + VerifyValue, true);
			return;
		}
	}

	if (objVal.length == 0)
	{
		objVal = SeS(ObjectName).GetText();
		if (objVal.length == 0)
		{
			objVal = SeS(ObjectName).GetInnerText();
			if (objVal.length == 0)
			{
				Tester.Assert("Verify that: " + ObjectName + " = " + VerifyValue, false, "", {comment: "No value found"});
				return;
			}
		}
	}
	if (objVal == "on")  //checkbox default value
	{
		objVal = SeS(ObjectName).GetChecked();
		if (objVal.length == 0)
		{
			Tester.Assert("Verify that: " + ObjectName + " = " + VerifyValue, false, "", {comment: "No value found"});
			return;
		}
	}
	if (VerifyValue == objVal)
	{
		Tester.Assert("Verify that: " + ObjectName + " = " + VerifyValue, true);
	}
	else
	{
		Tester.Assert("Verify that: " + ObjectName + " = " + VerifyValue, false, "", {comment: "Actual value = " + objVal}); 
	}
}



function ux_GenerateRenewal (/**string*/ ExpirationDate, /**string*/ Batch, /**string*/ Module, /**string*/ Benefit, /**string*/ Customer)
{
	ux_DialogEditDate(ExpirationDate);
	UX_DialogSetLookupValue('Batch', Batch);
	UX_DialogSetLookupValue('Module', Module)
	UX_DialogSetLookupValue('Benefit', Benefit)
	UX_DialogSetLookupValue('Customer', Customer)
	ux_ButtonOK()
	Global.DoSleep(1000);
	ux_ButtonConfirm()
}
