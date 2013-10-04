<?php
 //Creates 10 Random numbers between 1-99. #1 and #6 being the "winning" numbers
 for ($x=1; $x<=10; $x++)
  {
   if($x<=5) { $newScratchNumbers1[$x] = rand(1,99); $newScratchNumbers1[$x] =  str_pad($newScratchNumbers1[$x], 2, '0', STR_PAD_LEFT);  }
   else { $newScratchNumbers2[$x] = rand(1,99); $newScratchNumbers2[$x] = str_pad($newScratchNumbers2[$x], 2, '0', STR_PAD_LEFT); }
  }
  
  
  $newScratchNumbers1a = implode("  ", $newScratchNumbers1);
  $newScratchNumbers2a = implode("  ", $newScratchNumbers2);
    
  //Check if Number is a Winner or Not
  $YourNumbers = array_merge(array_slice($newScratchNumbers1, 1), array_slice($newScratchNumbers2, 1));
  
  if( (in_array($newScratchNumbers1[1],$YourNumbers)) || (in_array($newScratchNumbers2[6],$YourNumbers)) ){
    $WinCheck = "True";
  } else { $WinCheck = "False"; }
  
?>
<!DOCTYPE html>

<html>
<head>
<title>HTML Canvas Scratcher</title>



<!-- common stuff for headers -->

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=0;" />
<meta name="apple-mobile-web-app-capable" content="yes" />



<!-- jQuery library -->
<script src="JS/jquery-1.7.1.min.js" type="text/javascript"></script>

<!-- CSS and scripts -->
<link href="CSS/main.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript">
	  var ScratchLine1a = <?php echo json_encode($newScratchNumbers1a); ?>;
	  var ScratchLine2a = <?php echo json_encode($newScratchNumbers2a); ?>;
	  var WinCheck = <?php echo json_encode($WinCheck); ?>;
	</script>
<script src="JS/scratcher2.js" type="text/javascript"></script>
<script src="JS/main.js" type="text/javascript"></script>

</head>

<body>

<div class="beejblogouter">


<div class="textarea shadow2">

<noscript>(This demo requires JavaScript to run correctly.)</noscript>

<div id="scratcher-box" class="shadow1light">
	<div id="text-area">
		<span id="loading-text">Loading canvas images...</span>
	</div> <!-- #text-area -->

	<br><div id="Scratch_Holder">
		<canvas id="scratcher1" class="demo-canvas shadow1light" width="274" height="133"></canvas>
	</div>
	<div id="scratcher1Pct" class="scratcher-margin-bottom">0%</div>
	<div class="scratcher-margin-bottom"> [Scratch Over 80% to see if you've won!] </div>

<!-- <br><input type="button" value="Reset" id="resetbutton"> -->
</div> <!-- #canvas-box -->
</div> <!-- #textarea shadow2 -->
</div> <!-- First Div -->


</body>

</html>
