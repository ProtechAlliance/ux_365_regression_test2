If /I "%Processor_Architecture%" NEQ "x86" (
%SystemRoot%\SysWoW64\cmd.exe /C %0
goto :eof
)
SET SMARTESTUDIO_TEST_FOLDER=%~dp0
set WSCRIPTENGINE=cscript
pushd "%SMARTESTUDIO_TEST_FOLDERS%..\..\..\."
SET SMARTESTUDIO_TEST_FOLDERS=%SMARTESTUDIO_TEST_FOLDER:\=\\%
"C:\Program Files (x86)\Inflectra\Rapise\Bin\..\Engine\play.bat"  "%SMARTESTUDIO_TEST_FOLDER%Main.js" "-eval:g_modifierKeys='None'" "-eval:g_verboseLevel=1" "-eval:g_sstestPath='%SMARTESTUDIO_TEST_FOLDERS%Validate Member updates in AccountContact record.sstest'" "-eval:g_userFunctionsFileName='%SMARTESTUDIO_TEST_FOLDERS%..\\..\\..\\.\\Membership\\User.js'" "-eval:g_scriptObjectsFileName='%SMARTESTUDIO_TEST_FOLDERS%..\\..\\..\\.\\Membership\\Validate Member updates in Account\\Objects.js'" "-eval:g_objectsMetadataFileName='%SMARTESTUDIO_TEST_FOLDERS%..\\..\\..\\.\\Membership\\Validate Member updates in Account\\Objects.metadata'" "-eval:g_reportFileName='%SMARTESTUDIO_TEST_FOLDERS%Contact record.trp'" "-eval:g_commandInterval=1000" "-eval:g_iterationsCount=1" "-eval:g_stopOnError=true" "-eval:g_cacheObjects=false" "-eval:g_objectLookupAttempts=30" "-eval:g_objectLookupAttemptInterval=300" "-eval:g_beautifySavedObjects=true" "-eval:g_saveRecordingScreenshots=false" "-eval:g_savePlaybackScreenshots=false" "-eval:g_savePlaybackScreenshotsInTestReport=false" "-eval:g_saveScreenshotObjectOnly=false" "-eval:g_saveScreenshotsCaptureCursor=true" "-eval:g_entryPointName='Test'" "-eval:g_workDir='%SMARTESTUDIO_TEST_FOLDERS%..\\..\\..\\.'" "-eval:g_browserLibrary='Chrome HTML'" "-eval:g_rWnd='regex:.*'" "-eval:g_rvlScriptPath='%%WORKDIR%%\\Membership\\Validate Member updates in Account\\Validate Member updates in AccountContact record\\Main.rvl.xlsx'" "-eval:g_webPluginsAutoDetect='False'" "-eval:g_entryPointName='RVLSpecialEntryPoint'" "-eval:g_rvlScriptPath='%%WORKDIR%%\\Membership\\Validate Member updates in Account\\Validate Member updates in AccountContact record\\Main.rvl.xlsx'" "-eval:g_rvlScriptSheet='RVL'"
popd
