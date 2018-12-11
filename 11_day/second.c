/*

    Yes, solution to this problem should be dynamic programing, but why should you own a muscle car if you cannot drive, same goes for our machines

*/

#include<cstdio>
#include<math.h>

int calculate_power(int x, int y, int serial){

    int rack_id = x + 10;
    int power   = rack_id * y + serial;
    power *= rack_id;
    // use just a single digit, hundreds part
    if( power < 100 ){
        power = 0;
    }
    else {
        power = (power / 100) - std::floor(power / 1000 ) * 10;
    }

    return power - 5;
}

int main(){

    int serial = 6303;
    int window = 1;
    int gridsz = 300;

    // test, produces 4
    // int power = calculate_power( 101, 153, 71 );
    // printf("power: %d\n", power);

    int max_power  = 0;
    int max_x      = 0;
    int max_y      = 0;
    int max_window = 0;
    // largest power in 300 by 300 grid
    for( window; window < 150; window++ ){
        printf("%d.\n", window);
        for( int i=1; i < gridsz - window; ++i ){
            for( int j=1; j < gridsz - window; ++j ){
                
                int power = 0;
                for( int k = 0; k < window; k++ ){
                    for( int h = 0; h < window; h++ ){
                        power += calculate_power( i+k, j+h, serial );
                    }
                }
                if( power > max_power ){
                    max_power = power;
                    max_x = i;
                    max_y = j;
                    max_window = window;
                }
            }
        }
    }

    printf("max power: %d (%d, %d, %d) \n", max_power, max_x, max_y, max_window );

    return 0;
}