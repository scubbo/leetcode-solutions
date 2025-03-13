/**
 * You are given a 0-indexed integer array piles, where piles[i] represents the number of stones in the ith pile, and an integer k. You should apply the following operation exactly k times:
 *
 * Choose any piles[i] and remove floor(piles[i] / 2) stones from it.
 *
 * Notice that you can apply the operation on the same pile more than once.
 *
 * Return the minimum possible total number of stones remaining after applying the k operations.
 *
 * floor(x) is the greatest integer that is smaller than or equal to x (i.e., rounds x down).
 */

// Approach:
// * Max-Heap to be able to efficiently repeatedly find the largest number
// * Potential Micro-optimization (won't do this at first) - find the total at first (while making the heap), then keep
//    track of how many are removed, so don't have to sum them all up again at the end.
// * Another optimization would be to only maintain a heap of the k largest numbers, since only those could ever be
//    operated on (though would still need to sum up considering all of them)

// Gotta name this weird because I'm storing all my Leetcode solutions in sibling files in the same repo :shrug:
class MaxHeap2530 {
    data: number[]
    constructor(data: number[] = []) {
        this.data = [...data];
        this.buildHeap()
        console.log(`Finished building the heap: ${this.data}`)
    }

    buildHeap(): void {
        // Technically could just start at the end, but those are always leaves so won't have children so will be no-ops.
        const firstIndexWithPotentialChildren = Math.floor(this.data.length / 2) - 1
        for (let i = firstIndexWithPotentialChildren; i >= 0; i--) {
            this.heapify(i);
        }
    }

    // Turn the sub-tree rooted at `i` into a MaxHeap
    heapify(i: number): void {
        const left = 2*i+1;
        const right = 2*i+2;
        let biggest = i;
        if (left < this.data.length && this.data[i] < this.data[left]) {
            biggest = left;
        }
        if (right <= this.data.length && this.data[biggest] < this.data[right]) {
            biggest = right;
        }
        if (biggest != i) {
            console.log(`While heapify-ing, ${this.data[biggest]} was larger than ${this.data[i]}, so swapping ${biggest} and ${i}`)
            this.swap(i, biggest);
            // Have moved a value down into the subtree rooted at `biggest`, so need to cascade down potential updates.
            this.heapify(biggest);
        }
    }

    swap(a: number, b: number) {
        const temp = this.data[a];
        this.data[a] = this.data[b];
        this.data[b] = temp;
    }

    update(f: (n: number) => number): void {
        console.log(`Replacing ${this.data[0]}`)
        this.data[0] = f(this.data[0]);
        console.log(`with ${this.data[0]}`)
        this.heapify(0);
    }


}

function minStoneSum(piles: number[], k: number): number {
    let heap = new MaxHeap2530(piles)
    for (let i = 0; i<k; i++) {
        heap.update((n) => n - Math.floor(n/2))
        console.log(`Heap is now: ${heap.data}`)
    }
    return heap.data.reduce((a, b) => a+b)
}

//50151
//console.log(minStoneSum([7302,6794,8608,5968,9724,5797,5930,7304,2641,6552], 4));

// ?
console.log(minStoneSum([2113,8687,4820,3248,6927,4028,7450,1006,9888,7231,5852,5044,11,9399,656,6298,9326,9051,7727,5204,5740,8381,3664,117,3949,9769,6216,2768,4740,519,7942,837,5139,4860,7492,9533,9536,1371,4855,8950,337,9802,329,2452,5142,2306,8813,4468,3213,3703,4448,5820,5493,5409,13,4953,6927,1262,7385,6202,1564,6761,8416,7619,8256,3285,770,1068,5354,9417,4742,4550,2130,105,2703,9925,5105,8867,3513,1339,8336,9589,6482,8309,9965,2722,2854,8899,7030,6503,3350,8859,6178,720,4151,2938,8922,558,6964,9736,1505,8966,7967,901,5918,6072,3564,6283,5844,3890,3802,9921,98,300,7825,563,9132,496,4751,8055,185,187,7166,5363,8310,1570,1410,9791,9261,374,5029,9226,2394,6668,441,5417,5454,4114,5442,5556,2352,4835,9950,2827,5726,8395,6450,8175,7814,2334,5428,5467,5454,794,1703,6539,3433,6905,9496,8475,670,7622,469,4765,5733,3205,8101,787,8555,5564,2378,4282,3409,2390,6286,3385,8727,2164,4528,5000,535,7277,8437,6326,5978,3826,7709,7015,7762,4231,1171,6985,9375,3086,5270,6718,1181,6659,5413,5580,6840,739,2466,3141,1771,4864,6010,525,8199,4864,2777,955,2921,5374,6563,6984,9150,8369,3397,4459,8236,9463,6815,4615,2816,4313,6624,2494,8517,7595,9459,5494,434,336,2927,6268,4834,2577,1521,7572,1682,9474,7689,6749,3715,9284,4894,8520,4218,5527,7607,6738,118,6928,6618,1587,9218,3497,7368,3513,4429,2642,2244,8757,4684,5288,303,2046,1213,2308,3304,6407,457,5700,8629,2540,7893,5925,5410,2298,8015,1940,175,6698,8527,428,6011,124,848,7542,4068,3653,1539,5276,327,7394,539,7867,7672,1952,358,8061,1512,3666,8936,6212,5495,9268,441,7809,181,8564,6417,6009,9312,9021,9072,1294,4776,252,4878,1539,8154,4781,3916,4491,4807,7019,8445,5245,9363,2855,4762,3601,6353,2368,9397,9865,4829,9101,2947,6986,7983,1400,1155,3732,2567,5273,3216,6563,2204,8273,2451,6302,3697,5602,2421,3622,5812,4038,4195,6405,5296,3613,8244,6329,8807,2394,457,7973,3492,5423,9451,3434,2561,6947,4793,8045,1908,1265,6890,3518,3663,6781,3150,2630,8744,243,8111,110,5151,1595,6004,9129,5408,8072,3353,9519,8019,9261,9165,1915,6334,5338,7344,4457,1578,3707,1143,877,2175,7424,845,3995,3421,4099,5359,4495,3012,4193,3523,7655,9099,3746,6526,9459,1068,5451,574,233,3184,8778,1570,4559,7353,5639,4684,919,8990,5220,7520,4300,9775,4219,7883,4106,6521,3423,2667,644,1813,6726,9986,4026,5172,5583,8549,8663,6178,6370,9048,6604,4964,3901,9512,4335,3211,1986,3846,8203,4957,7901,2794,2905,6002,8288,1646,9505,9666,6821,4093,2240,8032,7788,1737,6663,6430,6283,2013,9863,2134,1266,6536,4435,2665,969,6738,5365,1092,3167,3283,908,8790,3092,8896,3835,159,3940,1550,8313,3636,5464,9027,9078,4464,2279,3614,5247,8868,6975,1029,5409,9547,991,1090,4012,5225,8976,4549,5742,6252,4142,9704,239,7334,9804,5532,7867,2955,6386,4295,8144,6836,9469,3131,3469,3682,5299,5138,3911,3415,163,8076,9728,3647,1774,8286,2321,4390,3583,9611,6859,4593,1166,9262,2547,4110,4646,1689,1304,6313,2544,1754,2091,6390,8278,6039,2745,8880,8516,5910,2404,2672,1555,8005,3549,1363,3198,3374,8044,6755,2664,5060,5524,4286,652,7427,1271,460,698,4019,2661,9729,8401,6947,5973,3969,6765,1776,7105,9175,2442,7680,5312,6191,1384,5590,6511,5213,7594,8765,4078,7928,6061,8698,7964,4654,2607,198,4816,9630,2142,3269,361,6913,2406,9476,6960,3392,4007,4196,9615,5290,7586,9816,1605,4690,454,5251,118,9935,5260,1135,7356,4190,596,6542,2858,3886,2173,3355,8044,1145,494,6278,8556,1949,4082,1802,1927,7032,1427,1464,4936,1652,9160,4436,4318,9716,3413,233,8988,3032,9046,1454,9530,3737,4659,5667,5519,9444,8280,4004,9156,1460,1087,1733,4332,7761,8262,2862,1117,2656,7967,9107,2747,528,1463,3593,8132,3378,6146,1121,6383,305,4494,9526,4023,1495,2512,8678,7733,7567,3869,3787,1868,6266,8034,5758,8460,7166,1690,2950,6549,8448,5701,2332,5744,659,7672,9867,9610,5490,6749,3114,8477,3432,429,4681,6237,7475,1455,2843,6661,348,8206,1280,3649,2419,7656,4984,1445,2144,8500,4885,8880,3950,6999,5826,7777,8303,2489,6561,8514,1424,3218,9802,4350,9481,313,4227,9734,6948,5051,4417,1817,8886,2357,6210,689,4697,5501,8438,1203,5038,6548,2081,7450,9746,8108,760,629,9055,9991,810,3853,6847,2894,4725,7761,8587,7153,5744,1519,8035,4069,6655,895,311,7076,9573,2899,4065,306,9284,4743,8443,9236,5506,8286,9365,2359,1744,7480,4330,7419,1771,2262,1354,7852,9375,4910,2026,7274,8783,4157,3425,1295,5502,3557,2849,3922,6279,7297,6162,6852,4187,9444,5140,6506,371,4646,7446,4928,6110,9367,7524,5408,3331,1860,6555,5493,6294,2203,1940,2750,2539,205,4041,9681,218,426,9925,3534,5764,5259,3980,5287,364,6688,8238,2460,6213,5745,5867,9268,6878,1232,979,8648,2026,2541,9746,6563,233,5666,8614,9376,8714,1920,8157,2824,7084,8069,3594,8206,6674,6848,2695,8484,6796,8867,2142,1344,4035,7158,7127,3260,446,4545,2252,1911,4126,1242,200,8256,4608,2679,8037,9163,8464,9936,4949,8135,5694,7628,1335,2645,1883,2272,8420,387,5,5827,6485,5148,4309,6210,8028,5873,524,887,5618,6650,3711,6825,1814,4657,6666,8344,5387,7766,9964,3209,5920,1237,9080,8262,6184,1271,7650,6954,5133,7726,4564,5554,2454,9565,8645,4769,2033,7564,8363,6305,327,8088,559,7162,6653,435,9638,9753,6603,7045,3316,9581,973,7609,1706,4374,5402,9574,5843,9064,5218,9119,2354,203,9878,390,7327,9719,9059,9321,4562,4940,279,7605,8099,9663,2574,8200,6195,1996,3263,3077,8349,5469,4701,6445,8972,1679,9954,8406,3563,2291,6811,8742,688,6313,3137,323,9114,9187,3792,6719,4906,9681,2922,1127,426,2625,8836,2480,9634,4364,7795,6231,3782,7462,9524,922,783,7242,9242,2691,1973,1013,1650,469,2823,9391,592,5791,858,3145,1749,4541,3705,8648,9334,3866,7012,4390,9628,5310,3974,212,7378,9259,5858,4785,3276,7134,4422,1485,738,9916,6957,4374,2578,6375,5690,2275,7174,9842,9028,7249,1735,8927,1254,8976,1956,5229,5352,3260,8783,3129,2216,4392,5610,8017,2532,5821,605,267,963,8381,3055,2598,1425,597,6951,2351,9014,7026,7459,2596,5610,7611,6391,9139,4654,9519,4448,917,6904,1883,7764,6624,1237,9335,4301,4882,2387,5342,8609,9232,5854,4751,2066,7461,9233,3993,8177,6105,7242,1630,7413,4012,3079,6706,2542,3875,4566,3923,1522,6196,7318,4618,6934,7621,2544,2307,6020,3256,9957,2253,1720,9888,8103,408,6410,2063,9970,9122,1534,308,1331,1043,3910,6018,1246,9095,238,2580,273,3968,9302,548,2123,1352,9031,850,9319,8666,803,9315,4417,3374,4254,4440,6064,3380,2097,203,4278,7494,42,104,7914,4340,5268,8315,1460,3141,5296,502,534,4351,8903,6614,8100,4681,4406,523,262,419,971,8961,5560,2270,1716,4300,6352,9853,580,1982,8359,5077,6168,2265,7945,3010,8816,8431,9165,3800,7977,949,7549,4282,4659,2199,1038,7326,1902,2358,3051,8643,3545,4305,8200,6800,600,9452,3789,7258,4051,6065,713,9354,3659,3852,1399,6442,2903,8382,517,6156,6685,3590,4057,6123,6586,2210,1174,4038,8601,6132,8763,7386,2190,6153,7246,5068,1407,9889,728,8356,6077,1552,8468,7625,7143,2427,5034,2209,1730,1614,5340,5338,3568,8276,9715,8453,3977,6447,8810,3039,561,977,3949,1568,6858,8007,4508,545,9199,8134,9890,8084,191,8861,1062,7760,8413,4327,7313,8446,1447,3030,7935,45,3302,2599,1055,3600,629,9003,319,1391,7032,130,969,5749,2601,2189,4436,9330,4074,5046,1621,9686,4122,5021,9638,2935,9157,402,5056,4699,4090,683,9867,1977,3500,9564,3474,2478,9147,8897,1741,7052,5843,5467,3517,5180,8358,4811,114,8664,3831,1501,5543,6582,3382,6177,8002,4639,5942,5164,7613,9054,85,3242,493,6347,7014,9104,141,1319,6195,5464,1357,1363,2026,5298,6622,2255,1336,323,6827,2150,120,6508,5324,3289,3833,8536,1472,1422,3489,1277,6341,5714,2200,5702,3487,6722,7963,7038,8849,1166,6132,7568,7915,6879,6363,1128,4543,2226,8257,7704,7693,1518,1649,3111,6847,6903,9845,8332,4893,7941,8675,5770,8226,2808,6772,1736,4520,923,2002,2349,2793,8719,4582,9347,1578,1841,4276,2666,3275,3190,7806,1685,9788,3383,4953,8316,2040,915,4448,5041,5507,7010,8341,6844,8720,2315,5313,1045,8801,3981,2282,8477,1857,4780,5957,8863,9848,6783,9431,4439,2397,816,1322,9875,2796,1987,8871,3399,8056,4778,938,4534,3335,3398,3335,3005,6469,6019,6148,6064,8059,1400,667,8913,7023,8620,4944,7542,7362,2488,328,2746,393,1633,5920,7022,7109,4748,3410,7868,7793,1722,7221,5168,6182,9196,4487,24,9269,5262,3653,5078,7508,458,5324,7665,2059,7842,2403,9838,4950,5250,9360,1513,2867,8549,9214,7797,6534,6370,9536,5498,9825,4514,8421,3586,675,7997,944,7733,7067,802,8953,6994,429,9786,3059,1625,8559,155,5879,3502,8620,5510,952,2871,7809,285,4485,8268,5036,1816,1540,8903,2951,8195,7399,3748,8895,748,4508,6106,3661,4788,5095,3302,4911,9024,3785,7303,1390,6058,7947,953,4004,4261,3470,6805,8473,4826,6132,7163,6549,3764,9317,7634,7666,8098,4873,446,2611,8689,1754,5425,7975,3857,9904,8071,1877,7527,8125,9004,7117,8451,2415,4611,1512,5030,8103,8142,4513,7410,4998,2781,4711,2669,7446,1084,1848,7486,5388,6833,8706,6109,2489,9307,4199,9631,7195,3059,4913,5254,1662,5076,9974,8369,2156,4606,1541,5967,6195,7241,9046,8811,723,5816,9306,2606,6943,2517,7528,5673,3715,5356,7970,1331,9790,7451,7412,3446,9115,7194,5684,2172,2083,7227,8992,5779,9573,1087,3595,568,9534,2545,2561,8290,4360,6747,3863,8463,4109,2263,5257,6199,4365,6105,1552,6045,3955,5144,5673,4218,107,5643,8937,3242,7975,1827,3069,6596,8960,2826,314,311,5845,9037,176,7660,7200,5584,1410,4232,4754,6547,7733,9769,8906,982,3330,6609,1009,4061,9345,527,1351,8613,3092,9250,534,4249,8191,5564,1237,6068,440,5544,4179,155,2314,7583,3039,8290,5741,8575,5736,4745,6434,9671,770,9709,5591,9420,2284,7324,3176,7455,4181,8117,3722,6314,9904,2016,300,1402,3486,249,8252,8713,7272,1095,9686,3521,7183,1294,7279,241,634,978,4136,5555,1731,7249,3252,4522,7278,9592,3636,3075,3607,394,8603,7975,9122,5084,7112,7681,4967,3305,2955,245,3762,7154,1891,3702,3606,9290,2448,6347,6199,4112,307,4179,9639,8968,3413,1455,8277,7772,9623,2843,4183,8025,4022,9198,3068,5521,1571,9331,2213,6711,3831,9992,538,2883,5719,4211,6031,2897,7164,8609,3305,9377,9142,5661,3088,6986,5435,1273,7941,7503,8505,4801,3940,2851,5489,5013,8857,1609,8516,5871,3189,8049,9609,2354,9780,305,1988,6234,2260,6784,1508,7390,6560,108,4229,2322,824,3888,9352,7291,6882,9143,6360,601,1471,8265,1329,8999,3666,6345,158,7441,4498,4782,8116,4815,5482,8681,8573,3755,2835,866,5471,3513,5172,8147,204,9703,9735,3365,6546,5326,6204,9133,4197,3548,5216,1871,3441,4899,5791,2876,3220,5614,7087,1759,3764,7527,7019,8862,9092,6278,9829,5638,6970,781,2882,7668,4684,1292,1746,556,7978,4119,7705,4089,3436,7035,6937,4822,1086,6947,5279,3070,7858,9128,2546,7522,4532,1171,627,4484,9532,5657,4017,8996,2213,4365,384,487,6167,8277,8992,5468,6836,4558,3780,321,9009,744,2255,1073,2722,2944,3345,6386,4048,9109,8264,9100,4775,4907,115,9308,5407,3841,4621,166,3957,9975,3206,706,1176,6413,9253,5245,3066,3862,6278,2710,3359,5877,7156,545,7575,9420,6930,9440,3091,9462,4920,985,4234,7010,7466,3637,7746,8124,7502,2533,4595,7286,4664,50,4967,8476,2034,6695,5736,981,52,1565,3729,2687,6142,4707,8348,8758,1736,4760,4181,8871,8647,8140,7178,4780,7565,5644,82,6812,8846,6480,7214,117,1247,8209,8603,5295,4998,7669,7870,1268,3207,9400,6642,9646,5066,2705,130,3239,2203,1239,2958,9529,1491,9076,10000,5656,1392,8139,6205,9223,8412,3216,2207,9172,3963,6049,5811,9439,3297,641,2880,4739,1229,794,9733,1740,4041,7518,4298,8047,5610,962,1757,686,3447,655,7474,5234,619,5318,7564,9833,6690,8513,9844,2761,813,3424,2658,6606,2830,1178,4623,5149,876,7006,2683,699,3583,3793,29,8554,1815,7738,9842,4060,5988,1249,6285,7739,2621,9682,183,7896,3304,1445,6674,9867,7514,9359,3696,2478,436,5267,9530,8655,3063,4765,2639,4840,791,5157,4851,6393,945,3307,3503,2240,62,2028,5552,1302,4307,7137,7217,9648,4066,2694,549,2650,3916,9175,9196,3021,4428,3038,5214,1481,649,8413,7989,6729,1182,5819,5555,300,287,1959,7519,7417,5782,1234,2848,6962,249,1739,5420,1902,8437,9772,8859,1904,2460,4614,9267,4928,3820,9711,4671,8605,1395,7522,1440,7258,8863,2783,7281,22,6600,6731,2442,9472,7229,1166,9691,9683,8631,5240,5998,5817,836,9072,5917,9998,895,56,237,8532,6591,7412,7385,666,7922,2818,302,5818,3419,7967,1681,5709,2164,8629,1931,2777,9973,326,5304,4595,3657,5672,4658,4159,6940,3445,9920,7272,4180,4670,3450,5839,5944,427,2352,4773,5005,393,6589,9146,8371,6595,6374,2469,5494,1440,5756,417,8946,5204,4725,668,9181,1327,1856,180,731,8141,8840,1311,1137,8321,6384,1500,5095,4060,2720,6874,7250,3543,4817,3737,4023,4461,1743,3607,3551,820,2426,1947,5491,375,866,2150,8428,7406,3924,8869,9518,205,8654,4513,4238,4494,6677,5570,7205,4550,9265,673,9350,4584,2876,1522,2561,1283,2271,8826,5689,861,6198,766,7875,7890,9767,3119,4938,3711,297,1577,311,1155,3277,142,2696,2577,240,1037,4097,519,9749,4765,4523,3869,1871,7788,773,4845,5632,2073,7,4879,2243,2084,5356,7057,5649,7953,457,9125,1071,9259,9721,7726,2159,1567,4867,5280,9050,9278,3004,1552,588,5089,5169,4932,2623,3279,1064,4938,6162,2021,6200,9199,2060,260,2181,377,4526,4895,8136,7382,6717,3722,7834,4947,464,1276,6309,8104,3042,5612,7441,4407,1284,2547,686,4220,5607,354,5013,6527,2547,807,4425,5131,4538,715,591,5241,6163,5061,7944,5980,3033,7726,3592,6992,4559,1110,4136,9662,9089,3138,7453,8265,1,8209,7029,5096,2681,358,2209,410,6238,7874,7199,2273,1904,9811,5743,8249,2028,5168,3791,2225,7657,3886,1878,8347,1985,8646,6869,8702,7054,6671,8497,813,4458,1403,7582,2361,7662,8070,2606,6616,4955,5743,7068,9050,3552,3387,928,9420,5341,2876,3254,1224,9421,5686,55,9412,6059,9848,9226,8648,9079,8453,7144,9062,8355,9518,9785,6652,3010,3964,7827,2131,2392,2472,8156,8675,48,3094,4322,9059,6025,4748,6405,3486,6538,6752,1915,4006,1636,8464,9302,9731,6326,4542,5455,6317,4501,8639,8519,4128,3678,2486,754,4901,2048,7000,9430,3216,8067,4644,5810,2479,4112,9520,6147,1189,3634,9951,620,3666,5150,6674,4634,8368,8388,547,3551,4576,2635,998,6762,1753,7573,3048,9086,2835,1902,1430,184,9074,1027,4961,2024,2394,9533,632,7908,860,133,6016,8846,8810,6498,6360,606,3051,2779,5955,6797,7036,9758,7926,4932,1683,3301,6874,8850,7578,8787,7180,611,8407,1082,7694,8054,9507,4929,9533,6885,104,5737,4020,6858,1188,1025,6833,9827,688,750,1306,3668,944,4194,9461,7248,8161,2911,6678,4864,9576,947,2212,5093,6846,1162,6658,6355,9689,5214,908,6974,6533,9533,7755,640,213,8967,5893,5596,1152,9871,6295,8198,1396,9914,4769,9415,1346,2108,1731,6322,9898,6214,4513,7237,6151,5839,7592,8283,5023,6879,936,5133,8606,6251,1966,5316,1339,6602,7794,4208,7202,1899,2890,9711,5607,2737,1438,3639,3577,6365,574,8168,1642,4033,1394,120,657,8369,3328,9738,3180,5649,683,8849,5847,8117,2421,8494,8696,9748,937,1495,6307,947,5476,4333,951,1370,808,4921,3369,6777,550,3079,9371,5613,2841,979,6346,3396,5798,4252,2615,633,6227,7927,9864,9420,4764,216,1553,5913,3414,8743,7082,9736,3509,152,7331,4479,2186,4059,3124,1663,7523,658,7588,4702,5995,9120,8118,3800,290,3486,9572,429,2007,4054,5875,1001,4448,626,8708,926,9524,702,84,7016,6383,5073,3544,6953,8830,3157,9105,5891,7886,8738,558,3116,8874,3261,5556,8698,293,3715,3396,3030,89,7265,5442,9403,2669,4261,4300,2772,4664,7981,8833,6373,329,3309,8351,1517,249,2517,2360,9425,8003,2489,8576,7657,9913,121,562,5067,6228,5404,3544,2714,8922,3257,2950,6590,7679,5941,220,5654,2820,8881,7052,162,3231,3506,6903,4816,401,7217,9912,6972,1269,7705,9346,4321,4153,4345,7145,2002,397,8293,8243,3290,9843,2022,3933,6897,6604,7429,7379,8747,5280,6260,3279,7117,8460,5114,3224,4268,209,6463,8778,3600,8266,2826,7535,7276,5344,4673,3748,1516,9245,5213,1793,4854,6247,1976,3109,1033,3412,9125,1148,4512,5618,9383,1969,4821,4170,1803,7805,5793,2677,3289,6141,7995,1798,5682,7617,4712,4098,7125,9475,8356,5930,530,2239,1605,6165,4248,100,4686,4648,789,9220,544,5884,5623,9556,1054,721,7946,9409,7316,1261,7346,7722,4706,3066,7010,6237,3228,2278,4806,2854,7067,4466,8408,989,2681,1940,7832,7964,1644,7927,3156,5706,7722,3991,5284,7878,8076,4313,5378,1905,9102,1183,2573,3494,3384,7672,9356,4395,3424,7862,3254,8138,3375,7057,8693,2355,9824,818,9347,9409,7692,7509,7853,9030,5568,4346,2850,8153,535,9772,5210,9340,1370,8125,1251,8359,7824,7044,8018,6166,2104,5662,6525,5798,8433,1175,4724,9303,3295,4574,9641,4422,7531,3772,7678,5168,8687,3324,7829,4665,8963,8958,3833,39,4167,3231,8127,1474,4827,2438,6149,657,3812,123,6031,9321,8647,6332,5551,1121,8721,1155,1134,7000,5901,1669,6933,7571,9945,9548,9992,662,1709,3694,785,2612,9666,5712,4951,1826,4050,7042,2639,7770,935,2474,6179,586,9454,1447,1183,5756,4403,5788,8062,6719,5216,8151,1762,8995,8034,9996,9891,3528,8151,707,3807,8117,2951,1381,5091,8688,5461,1762,1271,6988,719,4664,1690,2600,2202,1603,9598,7527,8056,2153,2600,939,3545,4739,2348,5672,8975,3220,7013,944,2326,4010,3081,5003,7045,5906,2157,8306,8241,5489,7553,742,4313,5048,4363,8175,7178,7213,1851,847,7561,3897,8736,8959,4021,901,2555,3280,2192,7737,2485,422,9182,1319,43,5587,8586,8054,6726,6252,9174,8219,7735,1273,2767,3832,4299,1145,3532,3915,3006,5802,4413,4857,4333,614,6456,8684,3530,8750,8286,7154,3855,6055,8142,2593,6114,818,9784,6431,2730,6513,4085,8880,8976,5281,4602,1937,7246,1496,5650,9066,2691,3667,7058,9670,308,4521,6823,4199,7719,679,9658,8537,2845,4793,9921,759,499,7579,2186,5469,4974,4355,399,2426,938,1307,4532,8779,3403,6305,6977,1497,1048,645,1824,6102,9643,7219,2369,7554,9812,9537,4228,7553,1650,4164,3350,3438,7030,6192,1290,7288,6037,6372,481,3841,3305,6788,9522,618,6697,4165,4724,718,3093,8715,9307,7090,546,7300,4232,6821,7318,9906,6502,6138,6021,862,1866,6846,5181,6671,5253,8945,1862,4911,3344,6307,814,8675,2409,4793,6672,2684,3872,5305,8790,6844,3357,4434,3882,4336,1043,3395,4273,4085,5416,9914,992,2739,9061,6669,4672,1412,3556,3349,250,2071,9135,7510,2638,4604,1142,6662,6856,4641,3667,1843,1755,628,3804,2652,483,4279,9759,4303,6030,160,5790,6141,9773,4774,2075,6718,7448,1119,9920,4641,8168,6581,8348,7588,9781,43,6812,8658,1932,3203,8587,6782,4218,3696,1845,6567,7611,576,4390,4618,3390,9708,6778,2150,9516,3474,4148,4012,7709,3451,4348,5461,8979,3783,6724,7495,7437,7490,7251,9442,4673,4150,9413,9927,2460,7248,4841,8469,7511,9266,3107,154,8145,6537,1539,1009,5893,6254,8804,8338,6531,8612,4898,1530,4016,5026,1646,3063,7773,7747,1934,1649,6628,7559,1652,6597,7024,5779,4418,6654,8532,171,1392,6192,1453,9452,1645,1457,9345,7149,7907,3066,4156,3041,7340,2875,5105,1667,4508,71,8204,733,6505,6397,4768,4608,7806,6581,5807,8703,3545,4648,2509,7221,4538,8670,10000,3224,638,5120,2131,2789,3251,3567,9624,701,3404,7052,8396,1820,6087,5387,6163,3391,2984,7124,2947,8479,3266,9491,8827,5271,1097,8176,1184,665,7546,5974,6643,3873,1589,2332,8847,8673,5128,3351,1075,8792,5402,1550,5609,350,8387,3451,3067,1911,6211,8365,2688,5616,7291,3977,3431,4270,1477,3889,3653,4231,5461,2561,4379,3896,7070,4845,4095,6131,8660,2980,4160,5738,6395,3092,3354,2218,2934,8515,4095,7600,8689,2158,4584,5798,3031,8841,7673,8982,440,5468,9063,3004,9961,6085,7116,5425,3023,7215,7337,9622,1530,9141,9398,2903,4667,703,1085,2621,1850,17,4576,2550,5013,1290,7809,9031,6294,5187,4480,4342,7080,7688,8487,8039,2105,1620,7382,5209,2878,6373,3732,7413,4318,7293,3991,1812,7449,8295,8242,262,7328,7269,7447,231,9558,6452,2238,756,8901,7819,9016,4752,5035,6890,8964,8155,8188,1491,5005,5160,3224,3950,9885,9545,3409,5453,7201,2160,3954,3982,5132,626,2219,7319,928,5329,1893,2142,3092,3662,9329,2466,9137,841,212,3379,9628,6804,6832,4693,529,397,6154,7454,5604,6431,7275,931,6009,240,1517,5039,8040,7594,5023,1379,2857,4119,9758,4519,3631,4189,5710,6344,9439,9655,4143,3136,9834,6620,3169,4413,8041,5123,2060,3622,4900,7538,5297,7347,989,8820,5169,9950,8790,7832,2362,9871,1602,2693,381,4776,5323,8054,21,7258,2345,9537,7572,6076,2542,7452,2283,5775,4715,2387,1907,8829,8153,1300,1991,9980,3124,5031,6422,3772,8843,1420,8134,1008,9386,2605,2499,7300,3762,9893,8171,4250,8464,6777,7647,2604,4943,1835,9607,1677,2009,222,3806,4183,6756,7395,421,281,7900,1917,3320,7962,4274,9943,4586,5766,3058,1290,9450,9142,8433,7756,1394,6080,1028,6513,509,4509,4211,9097,3760,9761,2798,2832,7455,9547,6975,2660,2906,8541,8420,6012,3464,9989,3993,7759,7306,411,7523,297,8860,8080,559,2861,8415,2697,1057,7645,5563,2894,1820,398,4281,9808,6374,1689,2919,3807,8804,1495,5829,417,4591,7039,3348,3728,6261,8333,5036,7035,5498,3024,4407,4032,1601,4340,1711,2035,1429,4179,8875,5252,5604,5726,821,9327,3899,6541,345,6544,5642,4810,525,5620,9227,7880,2641,2733,4670,8915,4484,9490,2637,4603,5009,9742,5139,9738,8473,6910,3486,3124,996,115,858,4187,9633,6803,5920,8330,7133,6445,3487,7965,6131,8337,9269,5814,2089,3906,4364,1360,5216,6945,5066,3547,9314,4691,2585,8281,4159,2606,8348,2753,1759,7174,9814,9070,2684,7972,8826,7043,9686,4144,1038,2989,8189,2453,6281,8123,6124,3334,2574,2520,2703,6931,9563,2700,7393,1884,9600,2460,2224,5867,2548,3928,850,2092,2758,3826,8048,8882,4516,1975,235,3215,7002,5101,3634,6112,806,4633,661,4319,5131,7657,4502,8837,1077,4033,8716,9354,6505,4499,9086,8154,2517,9395,8200,2970,6906,4002,5573,308,4632,4361,4475,1873,739,5981,5123,2480,8508,612,9503,3272,911,5722,7842,1459,8794,1983,3418,202,3846,5220,8451,4069,1384,3437,3823,8444,2562,5944,4594,6721,8006,957,3652,2756,6186,9399,1593,6075,9271,5619,9244,4361,5011,454,1222,8235,9630,8595,2942,5320,6913,3949,5040,6860,3983,5655,2464,4848,5442,5890,8124,5689,5193,1221,8460,7966,2104,7874,7125,8879,9678,3944,9960,8072,3568,2066,7398,3069,9705,5073,7558,8777,1609,9859,6185,7172,7123,4572,434,3731,2980,1197,6720,688,5654,2964,2239,8418,6009,2278,2449,3788,487,7649,3196,6180,5687,7148,9680,8475,3913,7800,3283,366,9596,7734,6031,6655,9349,6085,9165,446,3735,2016,6093,2700,2413,2642,6875,758,8630,8115,8267,3666,1905,8641,2294,1478,9184,3914,3827,7012,7224,2083,4160,5471,4601,5554,9354,8193,4427,8982,4199,457,3761,6621,8207,2486,1812,2360,4116,8442,4589,5162,4826,8589,9720,4740,2259,3358,7898,8272,9198,4765,6290,5833,6252,8643,6571,7500,4600,5194,4812,8311,7874,5818,2802,2022,8228,2337,5813,5142,2971,914,2898,7719,307,3941,1914,8980,9584,2495,1791,1353,9961,2929,9132,5385,1817,7164,8551,3975,918,8685,8865,7084,6271,4696,690,9188,5939,5832,4875,9846,6116,1471,726,5495,6122,6006,5024,2473,7109,6472,5234,5102,4671,5664,2511,5412,4135,2678,2498,8225,2890,5158,853,8098,6475,4449,63,6825,3170,3074,2671,1060,2620,3734,2487,3469,340,9259,196,4045,2992,2214,5174,1404,3620,8588,6792,2538,2950,6208,800,6472,324,5706,1482,1551,935,3652,2658,8718,3100,2281,7124,1031,3836,9305,1781,5011,2025,9743,4022,8475,8225,6759,2915,6934,2155,8297,7608,9721,3132,3373,4016,1033,6696,6058,9230,6087,4841,5834,718,4283,6392,9332,1590,8457,7494,8281,4804,7980,1968,3749,8952,3897,758,1394,6719,6180,398,7140,42,66,174,2024,7884,5402,5483,5786,1496,569,3838,8248,2451,1446,6825,9801,2988,3276,4411,7055,341,8257,5202,4061,356,3642,1387,9424,4726,8431,2829,1249,2231,3821,2977,8537,8530,7414,3166,6236,5138,5243,7582,3864,2344,5980,9705,2036,1424,9138,1040,9061,5415,6088,251,2761,569,1053,3931,4605,6214,1417,1379,3766,1714,4486,9748,5259,9940,1344,4810,3667,3515,4070,5760,7173,1279,6127,7819,1645,8671,5051,5125,5695,513,885,121,5371,5496,7114,4288,9005,1187,3396,1519,1930,9635,2287,8069,1048,5430,2602,5783,5782,7516,2120], 9561))